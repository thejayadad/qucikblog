'use server';

import { prisma } from '@/lib/prisma';

export const addPost = async (_: any, formData: { title: string; userEmail?: string }) => {
    try {
        const { title, userEmail } = formData;

        if (!userEmail) {
            throw new Error('User email is required.');
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                content: '',
                userEmail,
            },
        });

        return { postId: newPost.id };
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to create post.');
    }
};
