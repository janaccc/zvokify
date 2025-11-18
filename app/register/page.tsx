"use client";

import { useState, FormEvent } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      return alert("Gesli se ne ujemata!");
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-6">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">📝 Registracija</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-indigo-500 outline-none"
              placeholder="Vnesi email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Geslo</label>
            <input
              type="password"
              className="w-full p-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-indigo-500 outline-none"
              placeholder="Vnesi geslo..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Ponovi geslo</label>
            <input
              type="password"
              className="w-full p-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-indigo-500 outline-none"
              placeholder="Ponovi geslo..."
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-2 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition font-semibold"
          >
            Ustvari račun
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Že imaš račun?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">
            Prijavi se
          </a>
        </p>
      </div>
    </main>
  );
}
