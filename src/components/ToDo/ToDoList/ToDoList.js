import {useEffect, useState} from 'react';
import styles from './ToDoList.module.css'

function ToDoList() {
    const [toDos, setToDos] = useState([]);

    useEffect(() => {
        async function fetchToDoList() {
            const response = await fetch('http://localhost:8080/todo');
            const data = await response.json();
            setToDos(data);
        }

        fetchToDoList();
    }, []);

    const getStatusDotClass = (status) => {
        switch (status) {
            case 'OPEN':
                return styles.statusOpen;
            case 'IN_PROGRESS':
                return styles.statusInProgress;
            case 'DONE':
                return styles.statusDone;
            case 'WAITING_FOR':
                return styles.statusWaiting;
            default:
                return 'bg-gray-400';
        }
    };

    return (
        <div className="p-6 rounded-lg shadow-md">
            <ul className="space-y-6">
                {toDos.length > 0 ? (
                    toDos.map((toDo, index) => (
                        <li key={index}>
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">{toDo.task}</p>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`w-3 h-3 rounded-full inline-block mr-2 ${getStatusDotClass(toDo.status)}`}
                                        title={toDo.status.replace('_', ' ')}
                                    ></span>
                                    <span className="text-xs uppercase font-semibold">
                                        {toDo.status.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>
                            <p className="flex items-center justify-between">
                                <span>{toDo.assignedUser}</span>
                                <span>{toDo.dueDate}</span>
                            </p>
                        </li>
                    ))
                ) : (
                    <p>Geen taken gevonden.</p>
                )}
            </ul>
        </div>
    );
}

export default ToDoList;
