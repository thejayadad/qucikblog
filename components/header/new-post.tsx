'use client';

import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { addPost } from '@/lib/actions/post/add-post';

interface NewPostProps {
  userEmail?: string;
}

const NewPost: React.FC<NewPostProps> = ({ userEmail }) => {
  const router = useRouter();

  const onCreate = async () => {
    if (!userEmail) {
      toast.error('You must be logged in to create a post.');
      return;
    }

    const promise = addPost(null, { title: 'Untitled', userEmail });

    toast.promise(promise, {
      loading: 'Creating a document...',
      success: 'New document created!',
      error: 'Failed to create a document.',
    });

    try {
      const result = await promise;
      if (result?.postId) {
        router.push(`/admin/post/${result.postId}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button
      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
      onClick={onCreate}
    >
      <FiMessageSquare className="w-5 h-5 mr-2" />
      New Post
    </button>
  );
};

export default NewPost;
