'use server';

import { prisma } from '@/lib/prisma';
import { TitleSchema } from './title-schema';

export const createTitle = async (prevState: any, formData: FormData): Promise<any> => {
  // Validation
  const validatedFields = TitleSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      ...prevState,
      error: validatedFields.error.flatten().fieldErrors,
      loading: false,
    };
  }

  const { title, userEmail } = validatedFields.data;

  try {
    const post = await prisma.post.create({
      data: { title, userEmail },
    });

    return { 
      postId: post.id, 
      error: null, 
      loading: false 
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      ...prevState,
      error: { general: ['Failed to create post. Please try again.'] },
      loading: false,
    };
  }
};
