import Link from "next/link";

export default function Home() {
  return (
    <main className="text-center mt-10">
      <h1 className="text-3xl font-bold">Task Tracker Lite</h1>
      <Link href="/tasks" className="text-blue-600 underline">
        View All Tasks
      </Link>
    </main>
  );
}