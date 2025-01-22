import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const handleClick = useCallback(() => {
    const currentQuery = new URLSearchParams(params?.toString() || '');

    if (currentQuery.get('category') === label) {
      currentQuery.delete('category');
    } else {
      currentQuery.set('category', label);
    }

    router.push(`/?${currentQuery.toString()}`);
  }, [label, params, router]);

  // Hide categories if not on the home page ('/')
  if (pathname !== '/') {
    return null;
  }

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center gap-2 p-3 border-b-2 
        ${selected ? 'border-b-gray-800 text-neutral-800' : 'border-transparent text-neutral-500'} 
        hover:text-neutral-800 transition cursor-pointer`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default CategoryBox;
