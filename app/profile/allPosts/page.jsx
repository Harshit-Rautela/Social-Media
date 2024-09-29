'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import { AiFillEye } from 'react-icons/ai'; 
import { useRouter } from 'next/navigation';
const AllPosts = () => {
  const {data:session} = useSession();
  const [posts,setPosts] = useState([]);
  const router = useRouter();
  useEffect(()=>{
    const getAllPosts = async()=>{
      try {
        if (session && session.user) {
          const response = await fetch(`/api/profile/${session.user.id}/allposts`);
          if (response.ok) {
            const postData = await response.json();
            setPosts(postData);
          } else {
            throw new Error('Could not fetch the posts');
          }
        }
        
      } catch (error) {
        console.error(error.message);  
      }
    }
    getAllPosts();
  },[])
  
  const detailedPost = (postId)=>{
    router.push(`/profile/allPosts/${postId}`);
  }
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Your Posts
        </h1>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.content}</p>
                <div className="mt-4 text-sm text-gray-500">
                  <p><strong>Tags:</strong> {post.tags}</p>
                  <p><strong>Location:</strong> {post.location}</p>
                  <p><strong>Privacy:</strong> {post.privacy}</p>
                </div>
                <p className="text-sm mt-2 text-gray-950"><strong>Likes:</strong> {post.likes}</p>
                <div className="flex justify-end items-center mt-4">
                  <AiFillEye 
                    className="text-gray-700 hover:text-gray-900 cursor-pointer" 
                    size={24} 
                    onClick={() => detailedPost(post._id)} // Navigate to post detail
                  />
                </div>

                
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">You haven't made any posts yet.</p>
        )}
      </div>
    </div>
  );
}

export default AllPosts