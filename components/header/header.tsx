import { auth } from '@/auth'
import React from 'react'
import SignOut from './signout-btn'
import SignIn from './signin-btn'

const Header = async () => {
    const session = await auth()
    const userEmail = session?.user?.email
  return (
    <header>
        <div className='mx-auto max-w-screen-xl flex items-center justify-between p-4'>
            <div>LOGO</div>
            {
                session ? (
                    <>
                        <SignOut />
                    </>
                ) :
                (
                    <>
                        <SignIn />
                    </>
                )
            }
        </div>
    </header>
  )
}

export default Header