"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserProfile = ({ params }) => {
  const { userId } = params;
  const { data: session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/profile/${userId}`);
        if (!response.ok) throw new Error("Could not find the user profile");
        const data = await response.json();
        console.log("The data is: ", data);
        setProfile(data);
      } catch (error) {
        console.log("The error is:", error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-gray-800">Loading profile...</div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounder-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Profile of {profile.userName}
        </h1>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">User Id:</p>
          <p className="text-gray-600">{profile._id}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Bio:</p>
          <p className="text-gray-600">{profile.bio || "No bio available"}</p>
        </div>
        {profile.profilePicture && (
          <div className="mb-4 flex justify-center">
            <img
              src={profile.profilePicture}
              alt="Profile Picture"
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
        )}
        <div className="flex justify-center">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            onClick={()=>router.push('/home')}>Back To Home</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;