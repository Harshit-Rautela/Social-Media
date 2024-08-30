'use client';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/auth/login');
  };

  return (
    <nav className="bg-blue-400 text-white p-4 fixed w-full top-0 left-0 z-10 rounded-b-lg shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex space-x-4 flex-grow justify-center">
          <Link href="/profile">
            <button className="hover:text-gray-300 font-semibold">Profile</button>
          </Link>
          <Link href="/profile/allPosts">
            <button className="hover:text-gray-300 font-semibold">All Posts</button>
          </Link>
          <Link href="/profile/create">
            <button className="hover:text-gray-300 font-semibold">Create Post</button>
          </Link>
        </div>
        <button onClick={handleLogout} className="hover:text-gray-300 font-semibold">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
