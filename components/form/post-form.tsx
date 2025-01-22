'use client';

import { createPost } from '@/lib/actions/post/create-post';
import React from 'react';
import { useActionState } from 'react';

interface Props{
    userEmail: string;
}

const PostForm = ({userEmail}:Props) => {
  const [state, formAction] = useActionState(createPost, null);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create a Post</h1>
      <form action={formAction} className="space-y-4">
        {/* Title Input */}
        <input hidden defaultValue={userEmail} id='userEmail' name='userEmail' />
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter post title..."
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            name="content"
            id="content"
            placeholder="Write your description here..."
            rows={4}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>

        {/* Published Dropdown */}
        <div>
          <label
            htmlFor="published"
            className="block text-sm font-medium text-gray-600"
          >
            Publish Status
          </label>
          <select
            name="published"
            id="published"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="true">Published</option>
            <option value="false">Unpublished</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-600"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200"
          >
            Submit Post
          </button>
        </div>
      </form>

      {/* Feedback */}
      {state && (
        <p className="mt-4 text-center text-green-600">
          {state.error
            ? 'There was an error creating the post.'
            : 'Post created successfully!'}
        </p>
      )}
    </div>
  );
};

export default PostForm;