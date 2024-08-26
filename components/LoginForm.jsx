"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const backgroundImage =
    "https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg";
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await signIn("credentials", {
      name,
      password,
      redirect:false
    });
    console.log(result);
    if (result?.ok) {
      console.log("Login is successful");
      alert("Login is successful");
      router.push("/home");
    } else {
      console.error("Login failed:", result?.error || "Unknown error");
      alert("Login failed");
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
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="name" className="flex flex-col">
            <span className="text-gray-600">Username</span>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-3 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </label>
          <label htmlFor="email" className="flex flex-col">
            <span className="text-gray-600">Email</span>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </label>
          <label htmlFor="password" className="flex flex-col">
            <span className="text-gray-600">Password</span>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </label>
          <button
            className="w-full py-3 mt-4 bg-blue-400 text-white rounded-lg shadow hover:bg-blue-800 transition duration-300"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
