import { useEffect, useState } from "react" 
import { GetAllTasks } from "../api/task.api";
import { TaskCard } from "./TaskCard";

export function TaskList() {

    const [tasks, setTasks] = useState([])

    useEffect(() => {

        async function loadTasks() {
            const res = await GetAllTasks()
            setTasks(res.data)
        }
        loadTasks();
    }, []);

    return <div className="grid grid-cols-3 gap-3">
        {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
        ))}
    </div>;
}