import {useEffect, useState} from "react";
import Card from "../../Card/Card";
import {URL_BACKEND} from "../../constants";
import {Link} from "react-router-dom";

const STATUS_OPTIONS = [
    {value: "OPEN", label: "Open"},
    {value: "IN_PROGRESS", label: "In Progress"},
    {value: "DONE", label: "Done"},
    {value: "WAITING_FOR", label: "Waiting For"},
];

function ToDoForm({onSuccess}) {
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [assignedUserId, setAssignedUserId] = useState("");
    const [status, setStatus] = useState(STATUS_OPTIONS[0].value);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch(`${URL_BACKEND}/users`);
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error("Kon users niet ophalen:", err);
            }
        }

        fetchUsers();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!title || !dueDate || !assignedUserId || !status) {
            setError("Vul alle velden in.");
            return;
        }

        const payload = {
            title,
            dueDate,
            assignedUserId: assignedUserId,
            status,
        };

        try {
            const res = await fetch(`${URL_BACKEND}/todo`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || "Fout bij opslaan ToDo");
            }

            // Form reset en callback
            setTitle("");
            setDueDate("");
            setAssignedUserId("");
            setStatus(STATUS_OPTIONS[0].value);
            onSuccess?.();
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    }

    return (
        <Card width="w-5/6" shadow={false} coloredHeader={false} title="Nieuwe ToDo">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title">Taak</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="border rounded px-2 py-1 w-full"
                        placeholder="Bijv. Takenlijst opmaken"
                    />
                </div>

                <div>
                    <label htmlFor="dueDate">Vervaldatum</label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        className="border rounded px-2 py-1 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="assignedUser">Toegewezen aan</label>
                    <select
                        id="assignedUser"
                        value={assignedUserId}
                        onChange={(e) => setAssignedUserId(e.target.value)}
                        required
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="">— Selecteer user —</option>
                        {users.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                        className="border rounded px-2 py-1 w-full"
                    >
                        {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {error && (
                    <p className="text-red-600 text-sm">
                        {error}
                    </p>
                )}

                <div className="flex justify-center mt-6 gap-8">
                    <Link to={'/'} className="btn">
                        Terug
                    </Link>

                    <button type="submit" className="btn">
                        Opslaan
                    </button>
                </div>
            </form>
        </Card>
    );
}

export default ToDoForm;
