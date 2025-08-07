"use client";

import { useState } from "react";
import axios from "@/components/lib/axios";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post<{ token: string; message?: string }>("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <input name="email" onChange={handleChange} placeholder="Email" className="w-full p-2 mb-2 border" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full p-2 mb-2 border" />
      <button onClick={handleLogin} className="bg-green-600 text-white px-4 py-2">Login</button>
    </div>
  );
}
