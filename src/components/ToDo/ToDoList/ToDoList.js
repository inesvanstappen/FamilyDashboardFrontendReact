import {useEffect, useState} from 'react';
import styles from './ToDoList.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {URL_BACKEND} from "../../constants";

function ToDoList() {
    const [toDos, setToDos] = useState([]);
    const [editingToDo, setEditingToDo] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchToDoList() {
            const response = await fetch(`${URL_BACKEND}/todo`);
            const data = await response.json();
            setToDos(data);
        }

        fetchToDoList();
    }, []);

    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch(`${URL_BACKEND}/users`);
            const data = await res.json();
            setUsers(data);
        }

        fetchUsers();
    }, []);

    function handleEdit(toDo) {
        setEditingToDo(toDo);
    }

    function handleCancel(){
        setEditingToDo(null);
    }

    function toDateInputValue(isoString) {
        return new Date(isoString).toISOString().slice(0, 10);
    }

    function sortToDos(list) {
        return [...list].sort((a, b) => {
            if (a.status === 'DONE' && b.status !== 'DONE') return 1;
            if (a.status !== 'DONE' && b.status === 'DONE') return -1;
            return 0; // behoud originele volgorde voor andere statussen
        });
    }

    async function handleDelete(toDo) {
        const response = await fetch(`${URL_BACKEND}/todo/${toDo.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            const updatedList = toDos.filter(item => item.id !== toDo.id);

            setToDos(updatedList);

            alert(`Taak "${toDo.title}" succesvol verwijderd.`);
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();

        const response = await fetch(`${URL_BACKEND}/todo/${editingToDo.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(editingToDo),
        });

        if (response.ok) {
            const updatedList = toDos.map((item) =>
                item.id === editingToDo.id ? editingToDo : item
            );

            setToDos(updatedList);
            setEditingToDo(null);
        }
    }

    function getStatusDotClass(status) {
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
    }

    return (
        <>
            <ul className="space-y-6">
                {toDos.length > 0 ? (
                    sortToDos(toDos).map((toDo, index) => (
                        <li key={index}>
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-left">{toDo.title}</p>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`w-3 h-3 rounded-full inline-block mr-2 ${getStatusDotClass(toDo.status)}`}
                                        title={toDo.status.replace('_', ' ')}
                                    ></span>
                                    <span className="text-xs uppercase font-semibold">
                                        {toDo.status.replace('_', ' ')}
                                    </span>
                                    <span onClick={() => handleEdit(toDo)} className="cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faPencil}
                                            className=""
                                        />
                                    </span>
                                    <span onClick={() => handleDelete(toDo)} className="cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faTrashCan}
                                            className=""
                                        />
                                    </span>
                                </div>
                            </div>
                            <p className="flex items-center justify-between">
                                <span>{toDo.assignedUserName}</span>
                                <span>{toDo.dueDate}</span>
                            </p>
                        </li>
                    ))
                ) : (
                    <p>Geen taken gevonden.</p>
                )}
            </ul>
            {editingToDo && (
                <form
                    onSubmit={handleUpdate}
                    className="mt-6 p-4 border rounded bg-gray-50 space-y-4"
                >
                    <h3>Taak bewerken</h3>
                    <input
                        type="text"
                        value={editingToDo.title}
                        onChange={(e) =>
                            setEditingToDo({...editingToDo, title: e.target.value})
                        }
                        className="border p-2 w-full"
                    />
                    <select
                        value={editingToDo.status}
                        onChange={(e) =>
                            setEditingToDo({...editingToDo, status: e.target.value})
                        }
                        className="border p-2 w-full"
                    >
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                        <option value="WAITING_FOR">Waiting For</option>
                    </select>
                    <select
                        value={editingToDo.assignedUserId}
                        onChange={(e) =>
                            setEditingToDo({
                                ...editingToDo,
                                assignedUserId: Number(e.target.value),
                                assignedUserName: users.find(user => user.id === Number(e.target.value)).name,
                            })
                        }
                        className="border p-2 w-full"
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        value={toDateInputValue(editingToDo.dueDate)}
                        onChange={e =>
                            setEditingToDo({
                                ...editingToDo,
                                dueDate: e.target.value // blijft 'YYYY-MM-DD'
                            })
                        }
                        className="border p-2 w-full"
                    />

                    <div className="btn-wrapper">
                        <button className="btn"
                                type="submit"
                        >
                            Opslaan
                        </button>
                        <button className="btn" type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </>
    );
}

export default ToDoList;
