import Card from "../Card/Card";
import ToDoList from "../ToDo/ToDoList/ToDoList";
import WeekMenu from "../WeekMenu/WeekMenu";
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons";
import Weather from "../Weather/Weather";

function Main() {
    return (
        <>
            <main className="App gap-5 p-4 w-4/5 flex justify-between">
                <Card width="w-1/3" shadow={true} coloredHeader={true} title="Weather" icon={faArrowsRotate}>
                    <Weather/>
                </Card>
                <Card width="w-1/3" shadow={true} coloredHeader={true} title="To-do">
                    <ToDoList/>
                </Card>
                <Card width="w-1/3" shadow={true} coloredHeader={true} title="Weekmenu">
                    <WeekMenu/>
                </Card>
            </main>
        </>
    )
}

export default Main;