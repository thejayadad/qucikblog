import { auth } from '@/auth';
import Box from '@/components/ui/box';
import getPostById from '@/lib/actions/post/get-postby-id';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { FiFacebook } from 'react-icons/fi';
import {FaFacebook, FaTwitter, FaYoutube} from "react-icons/fa"
import NewPost from '@/components/form/new-post';

interface UpdatePostPageProps {
  params: {
    id: string;  // postId should be passed dynamically from the route
  };
}

const UpdatePostPage = async ({ params }: UpdatePostPageProps) => {
  const session = await auth();
  const userEmail = session?.user?.email;

  // Access the postId directly from params without using await
  const { id } = await params;

  // Log to debug params
  console.log("Params:" +  params);
  console.log("PostId:" +  id);

  // Validate and destructure postId correctly
  if (!id) {
    return notFound(); // Show 404 page if postId is missing
  }

  // Fetch the post using the postId
  const post = await getPostById({ postId: id });

  if (!post) {
    return notFound(); // Redirect to 404 page if the post is not found
  }

  return (
    <Box>
    <div className='flex flex-col pt-28'>
      <div className='flex gap-8'>
        <div className='w-full'>
            <NewPost />
          </div>
      </div>
    </div>
  </Box>
  );
};

export default UpdatePostPage;
