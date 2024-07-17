'use client'

import { NavMenu } from '@/config/items.config'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
	const pathname = usePathname()

	return (
		<footer className='absolute bottom-0 flex h-[105px] w-full items-center justify-around bg-hint'>
			{NavMenu.map(item => {
				const isActive = pathname === item.route

				return (
					<Link
						className={
							'flex flex-col items-center justify-center font-semibold text-xl text-primary'
						}
						href={item.route}
						key={item.label}
					>
						{isActive ? (
							<Image
								src={item.imageActiveUrl}
								alt={item.label}
								width={36}
								height={36}
							/>
						) : (
							<Image
								src={item.imageUrl}
								alt={item.label}
								width={36}
								height={36}
							/>
						)}
						<p className={clsx({ 'text-[#04F75F]': isActive })}>{item.label}</p>
					</Link>
				)
			})}
		</footer>
	)
}
