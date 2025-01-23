import React from 'react'
import { FiUser, FiSettings, FiLogOut, FiMenu, FiMessageSquare } from 'react-icons/fi'
import SignOut from './signout-btn'
import Link from 'next/link'
import NewPost from './new-post';

interface UserMenuProps {
  userEmail?: string;
  userImage?: string;
}

// Define menu items array for better modularity
const menuItems = [
  {
    label: 'Profile',
    href: '/profile',
    icon: FiUser,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: FiSettings,
  }
];

const UserMenu: React.FC<UserMenuProps> = ({ userEmail, userImage }) => {
  return (
    <div className="relative">
      {/* Checkbox to control dropdown visibility */}
      <input type="checkbox" id="usermenu-toggle" className="hidden peer" />

      <label 
        htmlFor="usermenu-toggle" 
        className="flex items-center space-x-2 cursor-pointer p-2 border rounded-full hover:bg-gray-300 transition"
      >
        {userImage ? (
          <img src={userImage} alt="User Avatar" className="w-8 h-8 rounded-full border border-gray-300" />
        ) : (
          <FiUser className="w-8 h-8 text-gray-700 border border-gray-300 rounded-full p-1" />
        )}
        <FiMenu className="w-8 h-8 text-gray-700" />
      </label>

      {/* Dropdown Menu */}
      <div 
        className="absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 peer-checked:opacity-100 peer-checked:visible invisible transition-all duration-200 ease-in-out"
      >
        <ul className="py-2">
          {/* Greeting */}
          <li className="px-4 py-2 text-gray-700 font-medium border-b border-gray-200">
            Hi, {userEmail ? userEmail : 'Guest'}
          </li>
          <NewPost userEmail={userEmail} />
          {/* Dynamic Links */}
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <item.icon className="w-5 h-5 mr-2" />
                {item.label}
              </Link>
            </li>
          ))}

          {/* Sign Out Button */}
          <li>
            <SignOut />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserMenu
