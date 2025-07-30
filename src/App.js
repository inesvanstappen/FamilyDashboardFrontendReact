import './App.css';
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import ToDoList from "./components/ToDo/ToDoList/ToDoList";
import WeekMenu from "./components/WeekMenu/WeekMenu/WeekMenu";
import Weather from "./components/Weather/Weather";
import {faArrowsRotate} from '@fortawesome/free-solid-svg-icons';

function App() {
    return (
        <>
            <Header/>
            <div className="App flex flex-row flex-wrap gap-4 p-4 justify-center">
                <Card title="Weather" icon={faArrowsRotate}><Weather/></Card>
                <Card title="To-do">
                    <ToDoList />
                </Card>
                <Card title="Weekmenu">
                    <WeekMenu />
                </Card>
            </div>
        </>
    );
}

export default App;
