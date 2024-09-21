"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState(null);



  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("./auth/login");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/profile/${session.user.id}`);
        if (!response.ok) throw new Error("Failed to fetch profile");
        const profileData = await response.json();
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfileData();
  }, [session, router, status]);
  
  if (status === "loading" || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Profile of {session.user.name}
        </h1>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">User ID:</p>
          <p className="text-gray-600">{profile.userId}</p>
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
          <button
            onClick={() => router.push("/home")}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Back to Home
          </button>
          <br />
          <button
            onClick={() => router.push("/profile/update")}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
