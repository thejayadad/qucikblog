'use client';
import React, { useRef, useState, useEffect } from 'react';

const NewPost = () => {
  const contentEditableRef = useRef<HTMLDivElement | null>(null);
  const [titlePlaceholder, setTitlePlaceholder] = useState('Title');
  const [contentPlaceholder, setContentPlaceholder] = useState('Write your story...');

  // Function to handle placeholder visibility
  useEffect(() => {
    const handleInput = () => {
      const titleElement = contentEditableRef.current?.querySelector('h1');
      const contentElement = contentEditableRef.current?.querySelector('p');

      if (titleElement?.textContent?.trim() !== '') {
        setTitlePlaceholder('');
      } else {
        setTitlePlaceholder('Title');
      }

      if (contentElement?.textContent?.trim() !== '') {
        setContentPlaceholder('');
      } else {
        setContentPlaceholder('Write your story...');
      }
    };

    contentEditableRef.current?.addEventListener('input', handleInput);
    return () => contentEditableRef.current?.removeEventListener('input', handleInput);
  }, []);

  return (
    <main id="container" className="relative font-mono mt-5">
      <div
        id="editable"
        ref={contentEditableRef}
        contentEditable
        suppressContentEditableWarning
        className="outline-none focus:outline-none editable max-w-[800px] mx-auto border-b border-gray-300 pb-4"
        style={{ whiteSpace: 'pre-line' }}
      >
        <h1
          className="text-4xl font-bold text-gray-900 focus:outline-none placeholder-gray-400"
          data-placeholder={titlePlaceholder}
        >
          {titlePlaceholder}
        </h1>

        <p
          className="mt-4 text-lg text-gray-700 focus:outline-none placeholder-gray-400"
          data-placeholder={contentPlaceholder}
        >
          {contentPlaceholder}
        </p>
      </div>

      <style jsx>{`
        [data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af; /* Gray-400 for the placeholder */
          pointer-events: none;
          user-select: none;
        }

        [data-placeholder]:focus:before {
          content: "";
        }
      `}</style>
    </main>
  );
};

export default NewPost;
