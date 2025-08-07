export interface Task {
  _id?: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string; // ✅ Add this line
}
