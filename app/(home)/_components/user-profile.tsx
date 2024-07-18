'use client'

import ProgressBar from '@/components/progress-bar'
import { useUpdateUserMutation } from '@/store/api/user'
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
	const [progress, setProgress] = useState<number>(6000)
	const [plusOnes, setPlusOnes] = useState<PlusOne[]>([])
	const [_, __, selectionChanged] = useHapticFeedback()
	const [isWebAppReady, setIsWebAppReady] = useState<boolean>(false)
	const [clicksCount, setClicksCount] = useState<number>(0)
	const [updateUser] = useUpdateUserMutation()

	const handleProgress = (event: MouseEvent<HTMLImageElement>) => {
		setProgress(prev => prev - 1)
		setClicksCount(prev => prev + 1)

		selectionChanged()
		showPlusOneText(event)
	}

	useEffect(() => {
		if (webApp) {
			setIsWebAppReady(true)
		}
	}, [webApp])

	useEffect(() => {
		const ws = new WebSocket(
			`ws://localhost:8000/v1/users/${webApp?.initDataUnsafe.user.id}/ws`
		)

		ws.onopen = () => {
			console.log('WebSocket connected')
		}

		ws.onmessage = event => {
			const userData = JSON.parse(event.data)
			setProgress(userData.energy)
			setClicksCount(userData.balance)
		}

		return () => {
			ws.close()
		}
	}, [webApp?.initDataUnsafe.user.id])

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
