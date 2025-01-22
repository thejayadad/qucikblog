'use server';

import { z } from "zod";
import { put } from '@vercel/blob';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

// Validation schema for form inputs
const PostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  userEmail: z.string(),
  content: z.string().min(1, { message: "Description is required" }),
  published: z.string().transform((val) => val === "true"), // Convert to boolean
  imageUrl: z.any().optional() // Handle file validation separately
});

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png'];

export const createPost = async (prevState: any, formData: FormData) => {
  // Validate the form data
  const validatedFields = PostSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { title, content, published, userEmail } = validatedFields.data;
  const imageFile = formData.get("imageUrl") as File | null;

  let imageUrl = "";

  // Handle image upload if file exists
  if (imageFile) {
    if (imageFile.size > MAX_UPLOAD_SIZE) {
      return { error: { imageUrl: ["File size must be less than 3MB"] } };
    }
    if (!ACCEPTED_FILE_TYPES.includes(imageFile.type)) {
      return { error: { imageUrl: ["File must be a PNG"] } };
    }

    try {
      const { url } = await put(imageFile.name, imageFile, {
        access: "public",
        multipart: true
      });
      imageUrl = url;
    } catch (error) {
      console.error("File upload failed:", error);
      return { message: "Failed to upload image" };
    }
  }

  // Save post to database
  try {
    await prisma.post.create({
      data: { title, content, published, imageUrl, userEmail }
    });
  } catch (error) {
    console.error("Database error:", error);
    return { message: "Failed to create post" };
  }

  revalidatePath("/");
  redirect("/");
};