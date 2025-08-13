import './App.css';
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import ToDoList from "./components/ToDo/ToDoList/ToDoList";
import WeekMenu from "./components/WeekMenu/WeekMenu";
import Weather from "./components/Weather/Weather";
import {faArrowsRotate} from '@fortawesome/free-solid-svg-icons';
import WeekMenuForm from "./components/WeekMenu/WeekMenuForm";

function App() {
    return (
        <>
            <Header/>
            <main className="App flex flex-row flex-wrap gap-5 p-4 justify-center">
                <Card width="w-1/4" shadow={true} coloredHeader={true} title="Weather" icon={faArrowsRotate}><Weather/></Card>
                <Card width="w-1/4" shadow={true} coloredHeader={true} title="To-do">
                    <ToDoList/>
                </Card>
                <Card width="w-1/4" shadow={true} coloredHeader={true} title="Weekmenu">
                    <WeekMenu/>
                </Card>
                <WeekMenuForm/>
            </main>
        </>
    );
}

export default App;
