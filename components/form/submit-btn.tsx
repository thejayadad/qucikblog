'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  defaultText: string;
  pendingText: string;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ defaultText, pendingText, className }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full bg-gray-700 text-white py-3 rounded-full hover:bg-gray-800 transition disabled:opacity-50 flex items-center justify-center ${className}`}
    >
      {pending ? (
        <>
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
          {pendingText}
        </>
      ) : (
        defaultText
      )}
    </button>
  );
};

export default SubmitButton;
