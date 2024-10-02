"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // assuming you're using Next.js routing
import { useSession } from "next-auth/react";
import { FaHeart, FaArrowLeft } from "react-icons/fa";

const DetailedPost = ({ params }) => {
  const { data: session } = useSession();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { postId } = params;

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(
          `/api/profile/${session.user.id}/allposts/${postId}`
        );
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          throw new Error("Could not fetch the required post.");
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `/api/profile/${session.user.id}/allposts/${postId}/comments`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("THe data is:", data);
          setComments(data);
        } else {
          throw new Error("Could not fetch the comments.");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPostDetails();
    fetchComments();
  }, [params.postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="text-blue-600 mb-6 flex items-center text-lg hover:text-blue-800 transition"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-60 object-cover rounded-lg mb-6 shadow-md"
            />
          )}

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            {post.content}
          </p>

          <div className="mt-4 text-sm text-gray-600">
            <p>
              <strong>Tags:</strong> {post.tags.join(", ")}
            </p>
            <p>
              <strong>Location:</strong> {post.location}
            </p>
            <p>
              <strong>Privacy:</strong> {post.privacy}
            </p>
          </div>

          <div className="flex items-center justify-between mt-8">
            <p className="text-lg font-semibold text-gray-700">
              Likes: <span className="text-red-500">{post.likes}</span>
            </p>
            <FaHeart className="text-red-500 text-2xl" />
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Comments
            </h2>
            {comments.length > 0 ? (
              <ul className="space-y-4">
                {comments.map((comment, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm"
                  >
                  
                    <div className="flex items-center mb-2">
                      <img
                        src={comment.profilePicture} 
                        alt={`${comment.userName}'s profile`}
                        className="w-10 h-10 rounded-full object-cover mr-4" 
                      />
                      <p className="font-semibold text-gray-800">
                        {comment.userName}
                      </p>
                    </div>
                    <p className="text-gray-600">{comment.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPost;
