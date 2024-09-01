'use client';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreatePost = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [privacy, setPrivacy] = useState('Public');
  const router = useRouter();
  const backgroundImage = 'https://img.freepik.com/free-psd/social-media-sales-background_23-2151465320.jpg';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
      formData.append('tags', tags);
      formData.append('location', location);
      formData.append('privacy', privacy);

      const response = await fetch(`/api/profile/${session.user.id}/create`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/profile');
        alert('Post created successfully!');
      } else {
        throw new Error('Error creating post');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50" 
    style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-200 mb-6 text-center">
          Create a New Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-2">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title of your post"
              className="block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 text-gray-200"
            />
          </div>
          
          {/* Content textarea */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-200 mb-2">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post here..."
              rows="4"
              className="block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 text-gray-200"
            />
          </div>

          {/* Image file input */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-200 mb-2">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 text-gray-200"
            />
          </div>
          
          {/* Tags input */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-200 mb-2">Tags</label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Add tags (comma separated)"
              className="block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 text-gray-200"
            />
          </div>
          
          {/* Location input */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-200 mb-2">Location</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (optional)"
              className="block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 text-gray-200"
            />
          </div>

          {/* Privacy select */}
          <div>
            <label htmlFor="privacy" className="block text-sm font-medium text-gray-200 mb-2">Privacy</label>
            <select
              id="privacy"
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 text-gray-200"
            >
              <option value="Public">Public</option>
              <option value="Friends Only">Friends Only</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
