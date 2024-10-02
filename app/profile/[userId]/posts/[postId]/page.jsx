"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaHeart, FaArrowLeft } from "react-icons/fa";

const DetailedPost = ({ params }) => {
  const { data: session } = useSession();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { userId, postId } = params;

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(
          `/api/profile/${session?.user?.id}/allposts/${postId}`
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

    if (session?.user) {
      fetchPostDetails();
    }
  }, [postId, session]);
  const handleLikePost = async (postId, isLiked) => {
    try {
      const response = await fetch(
        `/api/profile/${userId}/allposts/${postId}/likes`,
        {
          method: isLiked ? "DELETE" : "POST",
          body: JSON.stringify({ userID: session.user.id }),
        }
      );

      if (!response.ok) throw new Error("Could not like the post");

      setPost((prevPost) => ({
        ...prevPost,
        liked: !isLiked,
        likes: isLiked ? prevPost.likes - 1 : prevPost.likes + 1,
      }));
    } catch (error) {
      console.log("The error is:", error);
    }
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    try {
      const response = await fetch(
        `/api/profile/${userId}/allposts/${postId}/comments`,
        {
          method: "POST",
          body: JSON.stringify({ comment, userID: session.user.id }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log('The data is:',data);
        //console.log(comments);
        setComments(data);
        setComment("");
      } else {
        throw new Error("Could not submit the comment.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
              <strong>Tags:</strong> {post.tags?.join(", ")}
            </p>
            <p>
              <strong>Location:</strong> {post.location}
            </p>
            <p>
              <strong>Privacy:</strong> {post.privacy}
            </p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <FaHeart
              className={`cursor-pointer transition-colors duration-300 ${
                post.liked ? "text-red-400" : "text-gray-400"
              }`}
              size={30}
              onClick={() => handleLikePost(post._id, post.liked)}
            />
          </div>
          {/* Comment section */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4 text-black">Comments</h3>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-50 bg-gray-700">{comment.text}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          {/* Comment form */}
          {session && (
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-900 rounded-lg mb-2 bg-gray-800"
                rows={3}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit Comment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedPost;
