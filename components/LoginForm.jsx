"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      name,
      password,
      redirect: false,
    });
    if (result?.ok) {
      router.push("/home");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://github.com/danaleko/Login-Form-By-Dan-Aleko/blob/main/bg.jpg?raw=true')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-10 border border-gray-200 backdrop-blur-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-transparent border border-white/20 rounded-full text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <AiOutlineUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-xl" />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Conditionally render input type
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-transparent border border-white/20 rounded-full text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <AiOutlineLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-xl" />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white text-xl"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? <FiEyeOff /> : <FiEye />} {/* Show the appropriate icon */}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-white">
            <label>
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
          >
            Login
          </button>
          <div className="text-center text-white text-sm mt-4">
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="font-semibold hover:underline text-blue-500">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
