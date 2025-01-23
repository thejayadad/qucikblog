'use client';

import React from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createTitle } from '@/lib/actions/post/create-title';
import SubmitButton from './submit-btn';

interface Props {
  userEmail: string;
  initialData: {
    title: string;
  },
  postId: string;
}

interface FormState {
  postId?: string;
  error?: {
    title?: string[];
    userEmail?: string[];
    general?: string[];
  };
  loading?: boolean;
}

const TitleForm: React.FC<Props> = ({ userEmail, initialData, postId}) => {
  const router = useRouter();

  // useActionState to handle form state and submission
  
  const [state, formAction] = useActionState<FormState>(createTitle, null);

  // Handle successful submission and redirection
  React.useEffect(() => {
    if (state?.postId) {
      toast.success('Post created successfully!');
      router.push(`/admin/post/${state.postId}`);
    } else if (state?.error?.general) {
      toast.error(state.error.general[0] || 'Please fix the highlighted errors.');
    }
  }, [state, router]);

  return (
    <div className="mt-8">
      <form action={formAction} className="space-y-6">
        <div>
          <input
            name="title"
            type="text"
            placeholder="Write your title here..."
            className={`mt-2 w-full text-4xl font-semibold text-gray-900 border-b border-gray-300 focus:ring-0 focus:outline-none placeholder-gray-400 ${
              state?.error?.title ? 'border-red-500' : ''
            }`}
          />
          {state?.error?.title && (
            <p className="text-red-500 text-sm mt-1">{state.error.title[0]}</p>
          )}
        </div>

        <input type="hidden" name="userEmail" value={userEmail} />

        <SubmitButton
          defaultText="Create Post"
          pendingText="Creating..."
        />
      </form>
    </div>
  );
};

export default TitleForm;
