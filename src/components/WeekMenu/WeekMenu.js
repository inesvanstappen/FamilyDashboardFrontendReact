import {useEffect, useState} from 'react';
import DifficultyDots from "../DifficulttyDots/DifficultyDots";

function WeekMenu() {
    const [weekMenu, setWeekMenu] = useState({upcomingDayRecipes: []});
    const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    useEffect(() => {
        async function fetchWeekMenu() {
            const response = await fetch('http://localhost:8080/weekmenu');
            const data = await response.json();
            setWeekMenu(data);
        }

        fetchWeekMenu();
    }, []);

    const mergeDataWithDaysOfTheWeek = () => {
        return weekMenu.upcomingDayRecipes.map((dayData) => {
            return {
                id: dayData.id,
                day: daysOfTheWeek[dayData.dayIndex],
                nameDish: dayData.recipe.name || "",
                categorie: dayData.recipe.categorie || "",
                difficulty: dayData.recipe.difficulty || "easy"
            };
        })
    };

    const displayData = mergeDataWithDaysOfTheWeek();

    return (
        <div className="flex flex-col gap-4">
            {weekMenu.upcomingDayRecipes.length > 0 &&
                mergeDataWithDaysOfTheWeek().map(data => (
                    <div
                        key={data.id}
                        className="flex flex-wrap items-center justify-between p-2 rounded"
                    >
                        <div className="w-full sm:w-1/4 font-semibold">{data.day}</div>
                        <div className="w-full sm:w-1/4 text-right">{data.nameDish}</div>
                        <div className="w-full sm:w-1/4 text-right">
                            <DifficultyDots level={data.difficulty}/>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default WeekMenu;