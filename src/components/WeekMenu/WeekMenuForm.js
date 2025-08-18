import {useEffect, useState} from "react";
import Card from "../Card/Card";
import {DAYS, URL_BACKEND} from "../constants";
import {Link, useNavigate, useParams} from "react-router-dom";

function WeekMenuForm() {
    const [recipes, setRecipes] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [selectedRecipes, setSelectedRecipes] = useState(Array(7).fill(""));

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchRecipes() {
            const response = await fetch(`${URL_BACKEND}/recipes`);
            const data = await response.json();
            setRecipes(data);
        }

        async function fetchWeekMenu() {
            const response = await fetch(`${URL_BACKEND}/weekmenu/${id}`);
            const data = await response.json();
            setStartDate(data.startDate);
            const idRecipes = data.upcomingDayRecipes.map((r) => r.recipe.id);
            setSelectedRecipes(idRecipes);
        }

        fetchRecipes();

        if (id) {
            fetchWeekMenu();
        }

        fetchRecipes();
    }, [id]);

    const handleRecipeChange = (dayIndex, recipeName) => {
        const copy = [...selectedRecipes];
        copy[dayIndex] = recipeName;
        setSelectedRecipes(copy);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipeIds = selectedRecipes.map((name) => {
            const match = recipes.find((r) => r.name === name);
            return match ? match.id : null;
        });

        const payload = {
            startDate,
            recipeIds
        };

        const method = id ? "PUT" : "POST";
        const url = id
            ? `${URL_BACKEND}/weekmenu/${id}`
            : `${URL_BACKEND}/weekmenu`;

        const res = await fetch(url, {
            method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            console.error("Opslaan mislukt", await res.text());
        } else {
            console.log("Weekmenu opgeslagen!");
            navigate('/');
        }
    };

    return (
        <>
            <Card width="w-5/6" shadow={false} coloredHeader={false} title="Create Weekmenu">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col justify-center mr-8">
                            <label htmlFor="startDate">Startdatum</label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                className="border rounded px-2 py-1 w-full"
                            />
                        </div>

                        <div className="flex flex-wrap gap-8">
                            {DAYS.map((day, idx) => (
                                <div key={day} className="mt-4">
                                    <label htmlFor={`day-${idx}`}>{day}</label>
                                    <select
                                        id={`day-${idx}`}
                                        value={selectedRecipes[idx]}
                                        onChange={(e) => handleRecipeChange(idx, e.target.value)}
                                        required
                                        className="border rounded px-2 py-1 w-full"
                                    >
                                        <option value="">— Selecteer recept —</option>
                                        {recipes.map((r) => (
                                            <option key={r.id} value={r.name}>
                                                {r.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-6 gap-8">
                        <Link to={'/'} className="btn">
                            Terug
                        </Link>

                        <button
                            type="submit"
                            className="btn"
                        >
                            Opslaan
                        </button>
                    </div>
                </form>
            </Card>
        </>
    )
}

export default WeekMenuForm;