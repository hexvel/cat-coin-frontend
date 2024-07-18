'use client'

import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

export default function Header() {
  const webApp = useWebApp()
  const pathname = usePathname()

  const handleCopyRef = () => {
    navigator.clipboard.writeText(
      `https://t.me/meowcatcoinbot?start=${webApp.initDataUnsafe.user.id}`
    )
    toast.info('Link copied!')
  }

  return (
    <header
      className={clsx(
        'w-full bg-hint h-[60px] flex items-center justify-center',
        {
          'justify-between px-4': pathname === '/friends',
        }
      )}
    >
      <Link className='text-center' href='/'>
        <h1 className='text-white text-3xl font-bold'>CatCoin</h1>
        <p className='text-[#466A87]'>Telegram bot</p>
      </Link>
      {pathname === '/friends' && (
        <button
          className='px-4 py-2 bg-[#04F75F] font-medium rounded-full active:scale-95 transition-transform'
          onClick={handleCopyRef}
        >
          Copy Link
        </button>
      )}
    </header>
  )
}
