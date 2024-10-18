"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaEdit } from "react-icons/fa"; // Import icons

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
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl"> {/* Enlarged box */}
        <div className="flex items-center mb-6">
          {profile.profilePicture && (
            <div className="w-40 h-40 flex-shrink-0">
              <img
                src={profile.profilePicture}
                alt="Profile Picture"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          )}
          <div className="ml-8">
            <h1 className="text-4xl font-bold text-gray-800">{session.user.name}</h1> {/* Username beside the photo */}
            <p className="text-lg text-gray-600 mt-2">{profile.bio || "No bio available"}</p> {/* Bio */}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => router.push("/home")}
            className="flex items-center bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300"
          >
            <FaHome className="mr-2" /> {/* Icon added */}
            Back to Home
          </button>
          <button
            onClick={() => router.push("/profile/update")}
            className="flex items-center bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300"
          >
            <FaEdit className="mr-2" /> {/* Icon added */}
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
