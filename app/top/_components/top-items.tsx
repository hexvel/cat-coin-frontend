'use client'

import Loader from '@/components/loader'
import { useGetTopUsersQuery } from '@/store/api/user'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

const TopItems = () => {
  const [filter, setFilter] = useState<'day' | 'month' | 'balance'>('balance')
  const { data, isLoading } = useGetTopUsersQuery(filter)

  const handleFilterChange = (newFilter: 'day' | 'month' | 'balance') => {
    setFilter(newFilter)
  }

  return (
    <div className='w-full'>
      <div className='mb-4 flex justify-center gap-x-4'>
        <button
          onClick={() => handleFilterChange('day')}
          className={clsx(
            'active:scale-95 transition-transform text-xl py-2 px-8 rounded-full bg-[#1E2A36]',
            {
              '!bg-[#04F75F] text-black': filter === 'day',
            }
          )}
        >
          День
        </button>
        <button
          onClick={() => handleFilterChange('month')}
          className={clsx(
            'active:scale-95 transition-transform text-xl py-2 px-8 rounded-full bg-[#1E2A36]',
            {
              '!bg-[#04F75F] text-black': filter === 'month',
            }
          )}
        >
          Месяц
        </button>
        <button
          onClick={() => handleFilterChange('balance')}
          className={clsx(
            'active:scale-95 transition-transform text-xl py-2 px-8 rounded-full bg-[#1E2A36]',
            {
              '!bg-[#04F75F] text-black': filter === 'balance',
            }
          )}
        >
          Баланс
        </button>
      </div>
      <ul className='w-full flex flex-col gap-y-4 items-center max-h-80 overflow-y-auto'>
        {isLoading || !data ? (
          <Loader />
        ) : (
          data.users.map((item, i) => (
            <li
              key={i}
              className='w-[90%] flex text-xl bg-[#12242C] px-4 py-1 rounded-full'
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
