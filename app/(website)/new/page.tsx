import { auth } from '@/auth'
import PostForm from '@/components/form/post-form'
import { redirect } from 'next/navigation'
import React from 'react'

const NewPostPage = async () => {
    const session = await auth()
    const userEmail = session?.user?.email
    if(!session){
        redirect('/')
    }
  return (
    <div>
        <PostForm
        userEmail={userEmail}
        />
    </div>
  )
}

export default NewPostPage