import React from 'react'
import Box from '../ui/box';
import PostHead from './post-head';

interface Props {
    // favoraite?: Favoriate[];
    // comment?: Comment[];
    post: string;
    currentUser?: string;
}

const PostListing: React.FC<Props>= ({post,currentUser}) => {
  return (
    <Box>
        <div className='flex flex-col gap-6'>
            <PostHead
            title={post.title}
            imageSrc={post.imageUrl}
            id={post.id}
            currentUser={currentUser}
            />
        </div>
    </Box>
  )
}

export default PostListing