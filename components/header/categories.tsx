'use client'
import React from 'react';
import Box from '../ui/box';
import { FiDollarSign, FiBookOpen, FiGlobe, FiHeart, FiMonitor } from "react-icons/fi";
import CategoryBox from './category-box';
import { useSearchParams } from 'next/navigation';

export const categoriesItems = [
  {
    label: 'Money',
    icon: FiDollarSign,
  },
  {
    label: 'Technology',
    icon: FiMonitor,
  },
  {
    label: 'Travel',
    icon: FiGlobe,
  },
  {
    label: 'Health',
    icon: FiHeart,
  },
  {
    label: 'Education',
    icon: FiBookOpen,
  },
];

const Categories = () => {
  const params = useSearchParams();
  const selectedCategory = params?.get('category');

  return (
    <Box>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {categoriesItems.map((category) => (
          <CategoryBox
            key={category.label}
            icon={category.icon}
            label={category.label}
            selected={selectedCategory === category.label}
          />
        ))}
      </div>
    </Box>
  );
};

export default Categories;
