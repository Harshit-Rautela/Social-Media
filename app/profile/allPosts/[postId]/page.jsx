"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // assuming you're using Next.js routing
import { useSession } from "next-auth/react";
import { FaHeart, FaArrowLeft } from "react-icons/fa";

const DetailedPost = ({ params }) => {
  const { data: session } = useSession();
  const [post, setPost] = useState(null);
  const router = useRouter();
  const {postId} = params;

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`/api/profile/${session.user.id}/allposts/${postId}`);
        if (response.ok) {
          const data = await response.json();    
          console.log(data);
          setPost(data);
        } else {
          throw new Error("Could not fetch the required post.");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPostDetails();
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
            {/* <FaHeart 
              className={`cursor-pointer transition-colors duration-300 ${post.liked ? 'text-red-400' : 'text-gray-400'}`} 
              size={30} 
              onClick={() => handleLikePost(post._id, post.liked)} 
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// const handleLikePost = async (postId, isLiked) => {
//   try {
//     const response = await fetch(`/api/posts/${postId}/likes`, {
//       method: isLiked ? 'DELETE' : 'POST',
//     });

//     if (!response.ok) throw new Error('Could not update like status');

//     // Handle updating the like status on the page
//     setPost((prevPost) => ({
//       ...prevPost,
//       liked: !isLiked,
//       likes: isLiked ? prevPost.likes - 1 : prevPost.likes + 1,
//     }));
//   } catch (error) {
//     console.error(error.message);
//   }
// };

export default DetailedPost;
