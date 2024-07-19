'use client'

import Loader from '@/components/loader'
import ProgressBar from '@/components/progress-bar'
import { useGetUserQuery, useUpdateUserMutation } from '@/store/api/user'
import {
  useHapticFeedback,
  useWebApp,
} from '@vkruglikov/react-telegram-web-app'
import Image from 'next/image'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styles from '../home.module.css'

interface PlusOne {
  id: string
  x: number
  y: number
}

const UserProfile = () => {
  const webApp = useWebApp()
  const [progress, setProgress] = useState<number>(6000)
  const [plusOnes, setPlusOnes] = useState<PlusOne[]>([])
  const [impactChanged, _, __] = useHapticFeedback()
  const [isWebAppReady, setIsWebAppReady] = useState<boolean>(false)
  const [clicksCount, setClicksCount] = useState<number>(0)
  const [updateUser] = useUpdateUserMutation()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleProgress = (event: MouseEvent<HTMLImageElement>) => {
    setProgress(prev => prev - 1)
    setClicksCount(prev => prev + 1)

    impactChanged('medium')
    showPlusOneText(event)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      updateUserData()
    }, 500)
  }

  const updateUserData = async () => {
    if (data) {
      try {
        await updateUser({
          telegram_id: data.telegram_id,
          energy: progress,
          balance: String(clicksCount),
          friends: data.friends,
        })
      } catch (error) {
        console.error('Failed to update user data', error)
      }
    }
  }

  useEffect(() => {
    if (webApp) {
      setIsWebAppReady(true)
    }
  }, [webApp])

  const { data } = useGetUserQuery(webApp?.initDataUnsafe.user.id, {
    skip: !isWebAppReady,
  })

  useEffect(() => {
    if (data) {
      setProgress(data.energy)
      setClicksCount(Number(data.balance))
    }
  }, [data])

  const showPlusOneText = (event: MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const newPlusOne: PlusOne = { id: uuidv4(), x, y }
    setPlusOnes(prev => [...prev, newPlusOne])

    setTimeout(() => {
      setPlusOnes(prev => prev.filter(plusOne => plusOne.id !== newPlusOne.id))
    }, 400)
  }

  if (!data) {
    return <Loader />
  }

  return (
    <>
      <p className='text-primary text-xl'>Your balance</p>
      <h1 className='text-4xl text-white font-extrabold mb-12'>
        {clicksCount}
      </h1>
      <div className='relative'>
        <Image
          className='active:scale-[95%] transition-transform'
          src='/cat_coin.svg'
          alt='Cat Logo'
          width={310}
          height={300}
          onClick={handleProgress}
        />
        {plusOnes.map(plusOne => (
          <span
            key={plusOne.id}
            className={`${styles.plusOne} absolute text-white text-3xl font-bold`}
            style={{ top: plusOne.y, left: plusOne.x }}
          >
            +1
          </span>
        ))}
      </div>
      <ProgressBar progress={progress} />
    </>
  )
}

export default UserProfile
