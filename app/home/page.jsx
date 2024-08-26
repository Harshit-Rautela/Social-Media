"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
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
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          You name is: {user.name}
        </h1>
        <p className="text-center text-gray-600">Your user ID is: {user.id||'Not available'}</p>
      </div>
    </div>
  );
};
export default Home;
