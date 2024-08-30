
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const backgroundImage =
    "https://plus.unsplash.com/premium_photo-1683492749168-ee69f4d90193?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <main className="flex min-h-screen">
      {/* Left Section */}
      <div
        className="flex flex-col justify-center items-center w-1/2 p-10 text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to SocialConnect
        </h1>
        <p className="text-xl text-center max-w-md drop-shadow-md">
          A place where you can connect with your loved ones and share your
          moments.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-1/2 p-10 bg-gray-100 text-white">
        <h2 className="text-3xl text-gray-800 font-semibold mb-6">
          Join Our Community
        </h2>
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <p className="text-lg  text-gray-800 font-medium text-center mb-2">
            New user? Sign up today!
          </p>
          <Link href='/signup'>
            <button className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300">
              Sign Up
            </button>
          </Link>

          <p className="text-lg  text-gray-800 font-medium text-center mt-4">
            Already a user? Sign in to continue.
          </p>
          <Link href='/auth/login'>
            
            <button className="w-full py-3 px-6 bg-white text-blue-600 border border-blue-600 rounded-lg shadow hover:bg-blue-50 transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
