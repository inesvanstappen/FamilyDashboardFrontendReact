import {useEffect, useState} from "react";
import Card from "../Card/Card";

function WeekMenuForm() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchToDoList() {
            const response = await fetch('http://localhost:8080/recipes');
            const data = await response.json();
            setRecipes(data);
        }

        fetchToDoList();
    }, []);

    return (
        <>
            <Card width="w-5/6" coloredHeader={false} title="Create Weekmenu">
                <form>
                    {recipes.length > 0 ? (
                        <>
                            <label htmlFor="recipe">Recept</label>
                            <input list="recipes" name="recipe"/>
                            <datalist id="recipes">
                                {recipes.map((recipe) => (
                                    <option key={recipe.id} value={recipe.name}/>
                                ))}
                            </datalist>
                        </>
                    ) : (
                        <p>Geen recepten gevonden.</p>
                    )}
                </form>
            </Card>

        </>
    )
}

export default WeekMenuForm;