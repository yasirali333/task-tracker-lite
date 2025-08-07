"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTaskById, updateTask } from "@/services/taskService";
import { Task } from "@/types/Task";

export default function EditTaskPage() {
  const { id } = useParams();
  const router = useRouter();

  const [task, setTask] = useState<Task & { dueDate?: string }>({
    title: "",
    description: "",
    completed: false,
    dueDate: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTask = async () => {
      try {
        const found = await getTaskById(id as string);
        console.log("Editing task:", found);
        setTask(found);
      } catch (err) {
        console.error("Error loading task:", err);
      }
    };
    loadTask();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "completed") {
      setTask({ ...task, completed: value === "true" });
    } else if (name === "dueDate") {
      setTask({ ...task, dueDate: value });
    } else {
      setTask({ ...task, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await updateTask(id as string, task);
      router.push("/tasks");
    } catch (err: any) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Edit Task</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="title"
            placeholder="Title"
            value={task.title}
            readOnly
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed focus:outline-none"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            rows={4}
          />
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate ? task.dueDate.slice(0, 10) : ""}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed focus:outline-none"
          />
          <select
            name="completed"
            value={task.completed ? "true" : "false"}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
          {error && (
            <p className="text-red-500 text-center font-medium text-sm mt-1">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition duration-150"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
}
