'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import { FaHeart } from "react-icons/fa";

const AllPosts = ({ params }) => {
  const { userId } = params;
  const {data:session} = useSession()
  const [posts,setPosts] = useState([]);
  useEffect(()=>{
    const getAllPosts = async()=>{
      try {
        const response = await fetch(`/api/profile/${userId}/allposts`)
        if(response.ok){
          const postData = await response.json();
          setPosts(postData);
        }else{
          throw new Error('Could not fetch the posts');
        }
        
      } catch (error) {
        console.error(error.message);  
      }
    }
    getAllPosts();
  },[])
  
  const handleLikes = async(postId,isLiked)=>{
    console.log(postId)
    console.log(isLiked)
    try {
      const response = await fetch(`/api/profile/${userId}/allposts/${postId}/likes`,{
        method:isLiked ? 'DELETE' : 'POST', 
        body: JSON.stringify({ userID: session.user.id }),  
      })
      if(!response.ok) throw new Error('Could not like the post');
      setPosts((prevPosts)=>
      prevPosts.map((post)=>
      post._id===postId ?{...post , liked:!isLiked , likes:isLiked?post.likes-1:post.likes+1}:post))
             
    } catch (error) {
      console.log('The error is:',error);
    }
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
                <div className="mt-4 flex items-center justify-between">
                  <FaHeart
                    onClick={() => handleLikes(post._id, post.liked || false)}
                    className={`cursor-pointer transition-colors duration-300 ${post.liked ? 'text-red-400' : 'text-gray-400'}`}
                    size={24}
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