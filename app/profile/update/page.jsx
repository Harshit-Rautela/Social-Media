"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [bio, setBio] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
 
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/profile/${session.user.id}`, {
        method: "PUT",
        body: JSON.stringify({ bio }),
      });

      if (response.ok) {
        console.log("Profile updated successfully!");
        router.push("/profile"); // Redirect to profile page
      } else {
        const errorData = await response.json();
        throw new Error("Failed to fetch profile");
      }
    } catch (error) {
      console.error("An error occurred. Please try again later.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Profile
        </h1>

        <form onSubmit={updateProfile} className="space-y-6">
          <div className="form-group">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio:
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell something about yourself"
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
