import { IEarnItems } from '@/types/items.interface'
import Image from 'next/image'
import EarnItems from './_components/earn-items'

const EarnItemsData: IEarnItems[] = [
  {
    label: 'Учимся вместо с хексиком',
    price: '10 000',
    channelId: '-1002100244555',
    url: 'https://t.me/tips_from_hex',
  },
  {
    label: 'All saves bot | Скачать видео',
    price: '10 000',
    channelId: '2128560907',
    url: 'https://t.me/AllSavesBot',
  },
  {
    label: 'Anime',
    price: '10 000',
    channelId: '-1001644293994',
    url: 'https://t.me/klin0kAnime',
  },
  {
    label: 'Мультики | Сериалы | Кино',
    price: '10 000',
    channelId: '-1001644547920',
    url: 'https://t.me/multiki_serialy_kino',
  },
]

const EarnPage = () => {
  return (
    <div className='flex flex-col items-center text-white mt-8'>
      <div className='w-[90%] flex gap-y-2 flex-col items-center text-center mb-8'>
        <Image
          src={'/loudspeaker.svg'}
          alt={'loudspeaker'}
          width={41}
          height={36}
        />
        <h1 className='text-3xl font-semibold'>Subscribe & Earn Coins</h1>
        <p className='text-red-600 text-xl'>
          Unfollowers will incur a penalty twice the size of the reward.
        </p>
      </div>
      <EarnItems items={EarnItemsData} />
    </div>
  )
}

export default EarnPage
