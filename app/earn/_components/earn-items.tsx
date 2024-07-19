'use client'

import { IEarnItems } from '@/types/items.interface'
import Image from 'next/image'

const EarnItems = ({ items }: { items: IEarnItems[] }) => {
  const handleJoin = (url: string) => {
    window.open(url, '_blank')
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
              <button
                className='bg-[#04F75F] text-black font-bold px-10 py-4 rounded-full active:scale-95 transition-transform'
                onClick={() => handleJoin(item.url)}
              >
                Join
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EarnItems
