'use client'

import Loader from '@/components/loader'
import { useGetUserQuery, useJoinChannelMutation } from '@/store/api/user'
import { IEarnItems } from '@/types/items.interface'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const EarnItems = ({ items }: { items: IEarnItems[] }) => {
  const webApp = useWebApp()
  const [isWebApp, setIsWebApp] = useState(false)
  const [joinChannel, { isLoading, error }] = useJoinChannelMutation()

  useEffect(() => {
    if (webApp) {
      setIsWebApp(true)
    }
  }, [webApp])

  const { data: userData } = useGetUserQuery(webApp?.initDataUnsafe.user.id, {
    skip: !isWebApp,
  })

  const handleJoin = async (
    url: string,
    channel_id: string,
    telegram_id: string
  ) => {
    await joinChannel({ channel_id, telegram_id }).unwrap()
    webApp.openLink(url, '_blank')
    webApp.close()
  }

  const shortenText = (text: string) => {
    if (text.length <= 20) {
      return text
    } else {
      return text.slice(0, 15 - 3) + '...'
    }
  }

  return (
    <div className='w-full'>
      {!userData ? (
        <Loader />
      ) : (
        <ul className='w-full flex flex-col gap-y-4 items-center max-h-80 overflow-y-auto'>
          {items.map(item => (
            <li className='w-[90%] flex items-center justify-between text-xl bg-[#12242C] pl-4 py-1 rounded-full'>
              <p>{shortenText(item.label)}</p>
              <div className='flex items-center gap-x-3'>
                <span className='flex items-center gap-x-2'>
                  <Image
                    src={'/star-coin.svg'}
                    alt={item.label}
                    width={20}
                    height={20}
                  />
                  <p>{item.price}</p>
                </span>
                {userData.actions.subscribed_channels.includes(
                  item.channelId
                ) ? (
                  <p className='text-[#04F75F] font-semibold text-lg px-2 py-4 rounded-full'>
                    You joined
                  </p>
                ) : (
                  <button
                    className='bg-[#04F75F] text-black font-bold px-10 py-4 rounded-full active:scale-95 transition-transform'
                    onTouchStart={() =>
                      handleJoin(item.url, item.channelId, userData.telegram_id)
                    }
                  >
                    Join
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default EarnItems
