"use client";
import { useState } from "react";
import { registerUser } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await registerUser(formData) as { token: string };
      localStorage.setItem("token", res.token); // Save token
      router.push("/login"); // or dashboard
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
