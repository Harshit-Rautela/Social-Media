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
  const {postId} = params;

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`/api/profile/${session.user.id}/allposts/${postId}`);
        if (response.ok) {
          const data = await response.json();    
          //console.log(data);
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
        const response = await fetch(`/api/profile/${session.user.id}/allposts/${postId}/comments`);
        if (response.ok) {
          const data = await response.json();
          console.log('The comment data is:',data);
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
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="text-gray-600 mb-4 flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
          )}

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {post.title}
          </h1>
          <p className="text-gray-700 mb-6">{post.content}</p>

          <div className="mt-4 text-sm text-gray-500">
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
          <div className="flex items-center justify-between mt-6">
            <p className="text-lg font-semibold text-gray-700">
              Likes: {post.likes}
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>
            {comments.length > 0 ? (
              <ul className="mt-4 bg-gray-600">
                {comments.map((comment, index) => (
                  <li key={index} className="bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="font-semibold">
                      {comment.userName}:
                    </p>
                    <p>{comment.text}</p>
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
