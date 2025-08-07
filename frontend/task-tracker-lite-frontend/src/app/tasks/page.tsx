"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Task } from "@/types/Task";
import { getTasks, deleteTask } from "@/services/taskService";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📋 All Tasks</h1>
        <Link href="/tasks/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ Add Task
        </Link>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="border rounded p-4 flex justify-between items-start"
          >
            <div>
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-700">{task.description}</p>
              <span className="text-sm text-gray-500 italic">
                {task.completed ? "Completed" : "Pending"}
              </span>
              {task.dueDate && (
                <span className="text-xs text-gray-400 block">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              )}
            </div>
            <div className="flex gap-2">
              <Link
                href={`/tasks/${task._id}/edit`}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(task._id!)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
