import { auth } from '@/auth';
import Box from '@/components/ui/box';
import getPostById from '@/lib/actions/post/get-postby-id';
import { notFound } from 'next/navigation';
import React from 'react'

interface UpdatePostPageProps {
    params: {
      id: string;  // postId should be passed dynamically from the route
    };
  }

const SinglePostPage = async ({ params }: UpdatePostPageProps) => {
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
        <div className='pt-28 px-4 h-full bg-purple-300'>
            SinglePostPage
        </div>
    </Box>
  )
}

export default SinglePostPage