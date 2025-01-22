import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import Box from '@/components/ui/box';
import TitleForm from '@/components/form/title-form';


const NewPostPage = async () => {
    const session = await auth()
    const userEmail = session?.user?.email
    if(!session){
        redirect('/')
    }
    if(!userEmail){
      redirect('/')
    }
  return (
    <Box > 
      <div className='flex items-center justify-center h-full p-6 pt-48'>
      <div>
        <h1 className='text-2xl'>Title your Post</h1>
        <p className='text-sm text-slate-600'>What do you want to title your post? Dont worry, you can change it later.</p>
        <TitleForm
        userEmail={userEmail}
        />
      </div>
        </div>
    </Box>
  )
}

export default NewPostPage