import './App.css';
import Layout from "./components/Layout/Layout";
import ToDoListForm from "./components/ToDo/ToDoList/ToDoListForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import NoPage from "./components/NoPage";
import WeekMenu from "./components/WeekMenu/WeekMenu";
import WeekMenuForm from "./components/WeekMenu/WeekMenuForm";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Main />} />
                        <Route path="AddToDo" element={<ToDoListForm />} />
                        <Route path="AddWeekMenu" element={<WeekMenuForm />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;
