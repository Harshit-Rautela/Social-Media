"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AiFillEye } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const AllPosts = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const deletePost = async (postId) => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/profile/${session.user.id}/allposts/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        if (session && session.user) {
          const response = await fetch(
            `/api/profile/${session.user.id}/allposts`
          );
          if (response.ok) {
            const postData = await response.json();
            setPosts(postData);
          } else {
            throw new Error("Could not fetch the posts");
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getAllPosts();
  }, [deletePost]);

  const detailedPost = (postId) => {
    router.push(`/profile/allPosts/${postId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Your Posts
        </h1>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105 duration-300 ease-in-out"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.content.length > 100
                    ? post.content.substring(0, 100) + "..."
                    : post.content}
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  <p>
                    <strong>Tags:</strong> {post.tags}
                  </p>
                  <p>
                    <strong>Location:</strong> {post.location}
                  </p>
                  <p>
                    <strong>Privacy:</strong> {post.privacy}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  <strong>Likes:</strong> {post.likes}
                </p>
                <div className="flex justify-end items-center space-x-6 mt-4">
                  <AiFillEye
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    size={28}
                    onClick={() => detailedPost(post._id)}
                  />
                  <FaTrash
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    size={24}
                    onClick={() => deletePost(post._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl">
            You haven't made any posts yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllPosts;
