'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { MouseEvent, useState } from 'react'

import TopItems from './_components/top-items'

const TopPage = () => {
  const [sortType, setSortType] = useState('День')

  const handleSortTypeChange = (e: MouseEvent<HTMLButtonElement>) => {
    setSortType(e.currentTarget.textContent as string)
  }

  return (
    <div className='flex flex-col items-center justify-center mt-8 text-white'>
      <div className='w-full flex justify-between gap-x-3 mb-6 px-2'>
        {['День', 'Месяц', 'Баланс'].map((tab, i) => (
          <button
            key={i}
            className={clsx(
              'active:scale-95 transition-transform text-xl py-2 px-8 rounded-full bg-[#1E2A36]',
              {
                '!bg-[#04F75F] text-black': tab === sortType,
              }
            )}
            onClick={handleSortTypeChange}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className='w-[90%] flex items-center gap-x-3 mb-6'>
        <Image src={'/cub.svg'} alt={'avatar'} width={40} height={40} />
        <h2 className='text-xl'>Best growth today</h2>
      </div>
      <TopItems />
    </div>
  )
}

export default TopPage
