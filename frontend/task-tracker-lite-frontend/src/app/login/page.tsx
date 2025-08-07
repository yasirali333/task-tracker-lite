"use client";

import { useState } from "react";
import axios from "@/components/lib/axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const handleLogin = async () => {
    try {
      // Accepts { token, user } from backend
      const res = await axios.post<{ token: string; user?: { name: string } }>("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      router.push("/tasks");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Sign In</h1>
        <div className="space-y-6">
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            autoComplete="email"
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            autoComplete="current-password"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow transition duration-150"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-600">Not registered?</span>
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="ml-2 text-blue-600 hover:underline font-semibold"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
