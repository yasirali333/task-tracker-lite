"use client";

import { useState } from "react";
import { createTask } from "@/services/taskService";
import { Task } from "@/types/Task";

export default function TaskForm({ onAdd }: { onAdd: (task: Task) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = await createTask({ title, description, completed: false, dueDate });
    onAdd(newTask);
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        className="w-full border p-2 rounded"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
    </form>
  );
}
