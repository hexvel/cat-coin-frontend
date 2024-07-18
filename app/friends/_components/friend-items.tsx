'use client'

import { useGetUserFriendsQuery } from '@/store/api/user'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import { useEffect, useState } from 'react'

const FriendItems = () => {
  const webApp = useWebApp()
  const [isWebApp, setIsWebApp] = useState(false)

  useEffect(() => {
    if (webApp) {
      setIsWebApp(true)
    }
  }, [webApp])

  const { data } = useGetUserFriendsQuery(webApp?.initDataUnsafe.user.id, {
    skip: !isWebApp,
  })

  console.log(data)

  const handleJoin = (url: string) => {
    // window.open(url, '_blank')
  }

  return (
    <div className='w-full'>
      <ul className='w-full flex flex-col gap-y-4 items-center max-h-80 overflow-y-auto'>
        {!data || !data.users ? (
          <p>Loading...</p>
        ) : (
          data.users.map((item, i) => (
            <li
              key={i}
              className='w-[90%] flex items-center justify-between text-xl bg-[#12242C] px-4 py-4 rounded-full'
            >
              <span className='flex items-center gap-x-2'>
                <p>{i + 1}.</p>
                <p className='font-medium'>{item.full_name}</p>
              </span>
              <p className='text-lg font-light'>{item.telegram_id}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default FriendItems
