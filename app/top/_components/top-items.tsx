'use client'

import Loader from '@/components/loader'
import { useGetTopUsersQuery } from '@/store/api/user'
import Image from 'next/image'
import { useState } from 'react'
import { CustomNavButton } from './CustomNavButton'

const TopItems = () => {
  const [filter, setFilter] = useState<'day' | 'month' | 'balance'>('balance')
  const { data, isLoading } = useGetTopUsersQuery(filter)

  const filters = [
    {
      filterType: 'day',
      title: 'День',
    },
    {
      filterType: 'month',
      title: 'Месяц',
    },
    {
      filterType: 'balance',
      title: 'Баланс',
    },
  ]

  return (
    <div className='w-[90%] flex flex-col items-center'>
      <div className='w-full mb-4 flex flex-wrap justify-between gap-2 md:gap-4'>
        {filters.map((items, i) => (
          <CustomNavButton
            key={i}
            {...items}
            filter={filter}
            setFilter={setFilter}
          />
        ))}
      </div>
      <ul className='w-full flex flex-col gap-y-4 items-center max-h-80 overflow-y-auto'>
        {isLoading || !data ? (
          <Loader />
        ) : (
          data.users.map((item, i) => (
            <li
              key={i}
              className='w-full flex text-xl bg-[#12242C] px-4 py-1 rounded-full'
            >
              <div className='flex gap-x-2 items-center'>
                <p>{i + 1}.</p>
                <Image
                  src={'/avatar.svg'}
                  alt={String(item.telegram_id)}
                  width={35}
                  height={35}
                />
              </div>
              <div className='ml-4'>
                <p>{item.full_name + ' ' + item.telegram_id}</p>
                <div className='flex gap-x-1'>
                  <Image
                    src={'/full-moon.svg'}
                    alt={String(item.telegram_id)}
                    width={16}
                    height={16}
                  />
                  <p className='text-lg'>{item.balance}</p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default TopItems
