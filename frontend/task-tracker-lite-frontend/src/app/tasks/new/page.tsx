"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "@/services/taskService";
import { Task } from "@/types/Task";

export default function AddTaskPage() {
  const router = useRouter();
  const [task, setTask] = useState<Task & { dueDate?: string }>({
    title: "",
    description: "",
    completed: false,
    dueDate: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "completed") {
      // Check if trying to mark as completed before due date
      if (value === "true" && task.dueDate) {
        const today = new Date();
        const dueDate = new Date(task.dueDate);
        today.setHours(0,0,0,0);
        dueDate.setHours(0,0,0,0);
        if (dueDate > today) {
          setError("You can't mark as completed before your due date.");
          setTask({ ...task, completed: false });
          return;
        } else {
          setError("");
        }
      }
      setTask({ ...task, completed: value === "true" });
    } else if (name === "dueDate") {
      setTask({ ...task, dueDate: value });
      setError("");
    } else {
      setTask({ ...task, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask(task);
    router.push("/tasks");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Add Task</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            rows={4}
          />
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        <select
          name="completed"
          value={task.completed ? "true" : "false"}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        >
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow transition duration-150"
          >
            Save Task
          </button>
        </form>
      </div>
    </div>
  );
}
