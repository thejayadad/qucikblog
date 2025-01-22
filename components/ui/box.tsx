import React from 'react'

interface Props {
    children: React.ReactNode;
}

const Box = ({children}:Props) => {
  return (
    <div className='mx-auto max-w-screen-xl xl:px-20 md:px-10 sm:px-2 px-4'>
        {children}
    </div>
  )
}

export default Box