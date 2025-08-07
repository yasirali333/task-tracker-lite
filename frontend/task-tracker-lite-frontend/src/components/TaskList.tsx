"use client";

import { Task } from "@/types/Task";
import { deleteTask, updateTask } from "@/services/taskService";

export default function TaskList({
  tasks,
  onDelete,
  onUpdate,
}: {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (updatedTask: Task) => void;
}) {
  const handleToggle = async (task: Task) => {
    const updated = { ...task, completed: !task.completed };
    const result = await updateTask(task._id!, updated);
    onUpdate(result);
  };

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="p-4 border rounded flex justify-between items-center"
        >
          <div>
            <h3 className={`font-bold ${task.completed ? "line-through" : ""}`}>
              {task.title}
            </h3>
            <p>{task.description}</p>
            {task.dueDate && (
              <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            )}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => handleToggle(task)}
              className="text-sm bg-yellow-400 text-white px-2 py-1 rounded"
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => {
                deleteTask(task._id!);
                onDelete(task._id!);
              }}
              className="text-sm bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
