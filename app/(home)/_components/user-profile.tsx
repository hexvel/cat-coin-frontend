'use client'

import Loader from '@/components/loader'
import ProgressBar from '@/components/progress-bar'
import { useGetUserQuery, useUpdateUserMutation } from '@/store/api/user'
import {
  useHapticFeedback,
  useWebApp,
} from '@vkruglikov/react-telegram-web-app'
import Image from 'next/image'
import { TouchEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import styles from '../home.module.css'

interface PlusOne {
  id: string
  x: number
  y: number
}

const UserProfile = () => {
  const webApp = useWebApp()
  const [progress, setProgress] = useState<number>(0)
  const [plusOnes, setPlusOnes] = useState<PlusOne[]>([])
  const [impactChanged, _, __] = useHapticFeedback()
  const [isWebAppReady, setIsWebAppReady] = useState<boolean>(false)
  const [clicksCount, setClicksCount] = useState<number>(0)
  const [updateUser] = useUpdateUserMutation()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const autoUpdateRef = useRef<NodeJS.Timeout | null>(null)

  const showPlusOneText = (event: TouchEvent<HTMLImageElement>) => {
    const touch = event.touches[0]
    const rect = event.currentTarget.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    console.log(x, y)

    const newPlusOne: PlusOne = { id: uuidv4(), x, y }
    setPlusOnes(prev => [...prev, newPlusOne])

    setTimeout(() => {
      setPlusOnes(prev => prev.filter(plusOne => plusOne.id !== newPlusOne.id))
    }, 400)
  }

  const handleProgress = (event: TouchEvent<HTMLImageElement>) => {
    if (progress < 1) {
      toast.warning('Limit! Energy is over')
      return
    }

    setProgress(prev => prev - 1)
    setClicksCount(prev => prev + 1)

    showPlusOneText(event)
    impactChanged('medium')

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      updateUserData()
    }, 300)
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
      webApp.expand()
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

  useEffect(() => {
    if (data && isWebAppReady) {
      autoUpdateRef.current = setInterval(async () => {
        if (progress < 6000) {
          setProgress(prev => prev + 3)
          await updateUserData()
        }
      }, 3000)

      return () => {
        if (autoUpdateRef.current) {
          clearInterval(autoUpdateRef.current)
        }
      }
    }
  }, [data, isWebAppReady, progress, updateUserData])

  if (!data) {
    return <Loader />
  }

  return (
    <div className='select-none flex flex-col items-center'>
      <p className='text-primary text-xl'>Your balance</p>
      <h1 className='text-4xl text-white font-extrabold mb-12'>
        {clicksCount}
      </h1>
      <div className='relative w-[300px]'>
        <Image
          className='active:scale-[99%] transition-transform'
          onTouchStart={handleProgress}
          src='/cat_coin.svg'
          alt='Cat Logo'
          width={300}
          height={300}
        />
        {plusOnes.map(plusOne => (
          <span
            key={plusOne.id}
            className={`${styles.plusOne} absolute text-white text-4xl font-bold`}
            style={{ top: plusOne.y, left: plusOne.x }}
          >
            +1
          </span>
        ))}
      </div>
      <ProgressBar progress={progress} />
    </div>
  )
}

export default UserProfile
