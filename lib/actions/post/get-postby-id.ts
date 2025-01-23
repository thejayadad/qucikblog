'use server';

import { prisma } from '@/lib/prisma';

interface IParams {
  postId?: string;
}

export default async function getPostById({ postId }: IParams) {
  try {
    if (!postId) {
      throw new Error('Post ID is required');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
      },
    });

    if (!post) {
      return null;
    }

    return { 
      id: post.id,
      title: post.title,
      content: post.content,
      user: {
        email: post.user.email,
      },
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
