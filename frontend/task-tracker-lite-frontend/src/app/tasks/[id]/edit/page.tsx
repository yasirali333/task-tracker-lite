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
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">📝 Edit Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate ? task.dueDate.slice(0, 10) : ""}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <select
          name="completed"
          value={task.completed ? "true" : "false"}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Task
        </button>
      </form>
    </div>
  );
}
