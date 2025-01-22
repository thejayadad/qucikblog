import { auth } from '@/auth'
import React from 'react'
import SignOut from './signout-btn'
import SignIn from './signin-btn'
import Box from '../ui/box'
import Logo from '../ui/logo'
import SearchBar from './search-bar'
import UserMenu from './user-menu'
import Categories from './categories'

const Header = async () => {
  const session = await auth()
  const userEmail = session?.user?.email || ''
  const userImage = session?.user?.image || ''

  return (
    <header className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Box>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <div className='hidden md:block'>
            <Logo />
            </div>
            <SearchBar />
            {session ? (
              <UserMenu userEmail={userEmail} userImage={userImage} />

            ) : (
              <SignIn />
            )}
          </div>              
        </Box>       
      </div>
      <Categories />
    </header>
  )
}

export default Header
