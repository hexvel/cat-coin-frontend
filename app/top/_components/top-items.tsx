'use client'

import { useGetUsersQuery } from '@/store/api/user'
import Image from 'next/image'

const TopItems = () => {
	const { data } = useGetUsersQuery()

	return (
		<div className='w-full'>
			<ul className='w-full flex flex-col gap-y-4 items-center max-h-80 overflow-y-auto'>
				{!data || !data.users ? (
					<p>Loading...</p>
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
