'use client'

import UserProfile from './_components/user-profile'

export default function HomePage() {
	return (
		<main className='w-full flex flex-col items-center p-24 text-white'>
			<UserProfile />
		</main>
	)
}
