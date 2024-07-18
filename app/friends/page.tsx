'use client'

import FriendItems from './_components/friend-items'

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
      <FriendItems />
    </div>
  )
}

export default FriendsPage
