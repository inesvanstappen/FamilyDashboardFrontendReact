import Card from "../Card/Card";
import ToDoList from "../ToDo/ToDoList/ToDoList";
import WeekMenu from "../WeekMenu/WeekMenu";
import {faArrowsRotate, faPencil, faPlus} from "@fortawesome/free-solid-svg-icons";
import Weather from "../Weather/Weather";
import {useRef, useState} from "react";

function Main() {
    const weatherRef = useRef();

    const [weekmenuId, setWeekmenuId] = useState(null);

    function handleRefreshWeather() {
        if (weatherRef.current) {
            weatherRef.current();
        }
    }

    return (
        <>
            <main className="App gap-5 p-4 w-4/5 flex justify-between">
                <Card
                    width="w-1/3"
                    shadow={true}
                    coloredHeader={true}
                    title="Weather"
                    icons={[{icon: faArrowsRotate, onClick: handleRefreshWeather}]}>
                    <Weather onRefreshRef={weatherRef}/>
                </Card>
                <Card width="w-1/3" shadow={true} coloredHeader={true} title="To-do"
                      icons={[{icon: faPlus, link: "/AddToDo"}]}>
                    <ToDoList/>
                </Card>
                <Card width="w-1/3" shadow={true} coloredHeader={true} title="Weekmenu"
                      icons={[
                          weekmenuId && {icon: faPencil, link: `/AddWeekMenu/${weekmenuId}`},
                          {icon: faPlus, link: "/AddWeekMenu"}
                      ].filter(Boolean)}>
                    <WeekMenu onLoad={setWeekmenuId}/>
                </Card>
            </main>
        </>
    )
}

export default Main;