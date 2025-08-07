"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Task } from "@/types/Task";
import { getTasks, deleteTask } from "@/services/taskService";

export default function TaskList() {
  const [userName, setUserName] = useState<string>("");
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    // Try to get user name from localStorage (if stored after login/register)
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userObj = JSON.parse(user);
        setUserName(userObj.name || "");
      } catch {
        setUserName("");
      }
    }
  }, []);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 6;

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

  // Pagination logic
  const totalPages = Math.ceil(tasks.length / pageSize);
  const paginatedTasks = tasks.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-green-700">All Tasks</h1>
          <div className="flex items-center gap-4">
            {userName && (
              <span className="text-green-700 font-semibold text-lg">{userName}</span>
            )}
            <Link href="/tasks/new" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow font-semibold transition duration-150">
              Add Task
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gray-300 hover:bg-gray-400 text-green-700 px-4 py-2 rounded-lg shadow font-semibold transition duration-150"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {paginatedTasks.map((task) => {
            let dueInfo = null;
            let overdueDays = 0;
            let cardBg = "bg-white";
            if (task.dueDate) {
              const today = new Date();
              const dueDate = new Date(task.dueDate);
              today.setHours(0,0,0,0);
              dueDate.setHours(0,0,0,0);
              const diffMs = dueDate.getTime() - today.getTime();
              const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
              if (diffDays > 0) {
                dueInfo = <span className="text-xs text-green-600 block">DUE in {diffDays} days</span>;
              } else if (diffDays === 0) {
                dueInfo = <span className="text-xs text-yellow-600 block">DUE today</span>;
              } else {
                overdueDays = Math.abs(diffDays);
                if (!task.completed) {
                  dueInfo = <span className="text-xs text-red-600 block">Overdue by {overdueDays} days</span>;
                }
                if (overdueDays > 5 && !task.completed) cardBg = "bg-red-100";
              }
            }
            return (
              <div
                key={task._id}
                className={`${cardBg} rounded-xl shadow-lg p-6 flex flex-col justify-between border border-green-200`}
              >
                <div>
                  <h2 className="text-xl font-bold text-green-700 mb-2">{task.title}</h2>
                  <p className="text-gray-700 mb-2">{task.description}</p>
                  <span className={`inline-block text-xs font-semibold px-2 py-1 rounded mb-2 ${task.completed ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}>{task.completed ? "Completed" : "Pending"}</span>
                  {dueInfo}
                </div>
                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/tasks/${task._id}/edit`}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg shadow font-semibold transition duration-150"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id!)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow font-semibold transition duration-150"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              className="px-3 py-1 rounded-lg bg-green-200 text-green-700 font-semibold disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="mx-2 text-green-700 font-bold">Page {page} of {totalPages}</span>
            <button
              className="px-3 py-1 rounded-lg bg-green-200 text-green-700 font-semibold disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
