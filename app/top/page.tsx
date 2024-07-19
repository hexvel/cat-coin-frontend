'use client'

import Image from 'next/image'

import TopItems from './_components/top-items'

const TopPage = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-8 text-white'>
      <div className='w-[90%] flex items-center gap-x-3 mb-6'>
        <Image src={'/cub.svg'} alt={'avatar'} width={40} height={40} />
        <h2 className='text-xl'>Best growth today</h2>
      </div>
      <TopItems />
    </div>
  )
}

export default TopPage
