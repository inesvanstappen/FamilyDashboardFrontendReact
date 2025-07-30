import {useEffect, useState} from 'react';
import DifficultyDots from "../../DifficulttyDots/DifficultyDots";

function WeekMenu() {
    const [weekMenu, setWeekMenu] = useState([]);
    const daysOfTheWeek = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];

    useEffect(() => {
        async function fetchWeekMenu() {
            const response = await fetch('http://localhost:8080/weekmenu');
            const data = await response.json();
            setWeekMenu(data.weekMenu);
        }


        fetchWeekMenu();
    }, []);

    const mergeDataWithDaysOfTheWeek = () => {
        return daysOfTheWeek.map((dayName, index) => {
            const dayData = weekMenu[index] || {};
            return {
                id: dayData.id,
                day: dayName,
                nameDish: dayData.name || "",
                categorie: dayData.categorie || "",
                difficulty: dayData.difficulty || "medium"
            };
        })
    };

    const displayData = mergeDataWithDaysOfTheWeek();

    return (
        <div className="flex flex-col gap-4">
            {weekMenu.length > 0 &&
                displayData.map((data) => (
                    <div
                        key={data.id}
                        className="flex flex-wrap items-center justify-between p-2 rounded"
                    >
                        <div className="w-full sm:w-1/4 font-semibold">{data.day}</div>
                        <div className="w-full sm:w-1/4">{data.nameDish}</div>
                        <div className="w-full sm:w-1/4">
                            <DifficultyDots level={data.difficulty} />
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default WeekMenu;