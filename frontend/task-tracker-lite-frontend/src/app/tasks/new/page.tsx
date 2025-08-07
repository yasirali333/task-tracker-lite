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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    await createTask(task);
    router.push("/tasks");
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">➕ Add Task</h1>
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
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
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
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Save Task
        </button>
      </form>
    </div>
  );
}
