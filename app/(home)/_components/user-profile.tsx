'use client'

import ProgressBar from '@/components/progress-bar'
import { RootState } from '@/store'
import { useTypedDispatch, useTypedSelector } from '@/store/hooks/typedHooks'
import { setupWebSocket, updateUser } from '@/store/slice/websocketSlice'
import {
	useHapticFeedback,
	useWebApp,
} from '@vkruglikov/react-telegram-web-app'
import Image from 'next/image'
import { MouseEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styles from '../home.module.css'

interface PlusOne {
	id: string
	x: number
	y: number
}

const UserProfile = () => {
	const webApp = useWebApp()
	const dispatch = useTypedDispatch()
	const [plusOnes, setPlusOnes] = useState<PlusOne[]>([])
	const [_, __, selectionChanged] = useHapticFeedback()
	const [isWebAppReady, setIsWebAppReady] = useState<boolean>(false)

	const { user, progress, clicksCount } = useTypedSelector(
		(state: RootState) => state.websocket
	)

	const handleProgress = (event: MouseEvent<HTMLImageElement>) => {
		if (user) {
			dispatch(
				updateUser({
					energy: user.energy - 1,
					balance: user.balance + 1,
				})
			)
		}

		selectionChanged()
		showPlusOneText(event)
	}

	useEffect(() => {
		if (webApp) {
			setIsWebAppReady(true)
			dispatch(setupWebSocket(webApp.initDataUnsafe.user.id))
		}
	}, [webApp, dispatch])

	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (user) {
				event.preventDefault()
			}
		}

		window.addEventListener('beforeunload', handleBeforeUnload)

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [user])

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
