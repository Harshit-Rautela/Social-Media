"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const backgroundImage =
    "https://i.pinimg.com/736x/1f/5c/37/1f5c37403ffe1c39e79649b8e7da7092.jpg";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Signup success");
      router.push("/auth/login");
    } else {
      console.error("Sign Up failed:", data.error);
      alert("Signup failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="w-full max-w-md bg-white bg-opacity-10 border border-gray-200 backdrop-blur-lg rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Sign Up</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-transparent border border-white/20 rounded-full text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              required
            />
            <AiOutlineUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-xl" />
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-transparent border border-white/20 rounded-full text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              required
            />
            <AiOutlineMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-xl" />
          </div>
          <div className="relative">
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-transparent border border-white/20 rounded-full text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              required
            />
            <AiOutlineLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-xl" />
          </div>
          <button
            className="w-full py-3 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignUpForm;
