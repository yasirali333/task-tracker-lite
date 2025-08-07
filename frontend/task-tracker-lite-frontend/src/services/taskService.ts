import api from "@/components/lib/axios";
import { Task } from "@/types/Task";

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get<Task[]>("/tasks");
  return res.data;
};

export const createTask = async (task: Task): Promise<Task> => {
  const res = await api.post<Task>("/tasks", task);
  return res.data;
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  const res = await api.put<Task>(`/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
