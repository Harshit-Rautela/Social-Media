"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  //since useSession returns two properties, data and status, here data is destructured and renamed to session.
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  const { user } = session;
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Welcome, {user.name}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Your user ID is: <span className="font-semibold">{user.id || 'Not available'}</span>
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/profile")}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
