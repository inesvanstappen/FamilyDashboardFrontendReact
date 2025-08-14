import {useEffect, useState} from "react";
import Card from "../Card/Card";
import {DAYS} from "../constants";

function WeekMenuForm() {
    const [recipes, setRecipes] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [selectedRecipes, setSelectedRecipes] = useState(Array(7).fill(""));

    useEffect(() => {
        async function fetchRecipes() {
            const response = await fetch('http://localhost:8080/recipes');
            const data = await response.json();
            setRecipes(data);
        }

        fetchRecipes();
    }, []);

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

        const res = await fetch("http://localhost:8080/weekmenus", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            console.error("Opslaan mislukt", await res.text());
        } else {
            console.log("Weekmenu opgeslagen!");
            // evt. form resetten of doorsturen
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

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
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