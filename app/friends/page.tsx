'use client'

import { IFriendItems } from '@/types/items.interface'
import FriendItems from './_components/friend-items'

const data: IFriendItems[] = [
	{
		id: '1',
		friendId: 1,
		label: 'Jhon Doe',
		price: '+50000',
	},
	{
		id: '2',
		friendId: 1,
		label: 'Julian Doe',
		price: '+50000',
	},
	{
		id: '3',
		friendId: 1,
		label: 'Tyler Smith',
		price: '+50000',
	},
	{
		id: '4',
		friendId: 1,
		label: 'Diana Smith',
		price: '+50000',
	},
	{
		id: '5',
		friendId: 1,
		label: 'Diana Smith',
		price: '+50000',
	},
	{
		id: '6',
		friendId: 1,
		label: 'Diana Smith',
		price: '+50000',
	},
]

const FriendsPage = () => {
	return (
		<div className='mt-8 flex flex-col items-center text-white gap-y-10'>
			<div className='flex flex-col items-center'>
				<h1 className='text-4xl font-semibold'>Invite your friends!</h1>
				<h3 className='text-lg text-white/80'>
					You and your friend will receive a bonus
				</h3>
			</div>
			<p className='text-2xl font-semibold'>List of your friends</p>
			<FriendItems items={data} />
		</div>
	)
}

export default FriendsPage
