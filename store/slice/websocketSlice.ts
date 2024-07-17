import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../'

interface User {
	telegram_id: string
	energy: number
	balance: number
	friends: string[]
}

interface WebSocketState {
	user: User | null
	progress: number
	clicksCount: number
}

const initialState: WebSocketState = {
	user: null,
	progress: 0,
	clicksCount: 0,
}

const websocketSlice = createSlice({
	name: 'websocket',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload
			state.progress = action.payload.energy
			state.clicksCount = action.payload.balance
		},
		updateUser(
			state,
			action: PayloadAction<{ energy: number; balance: number }>
		) {
			state.progress = action.payload.energy
			state.clicksCount = action.payload.balance

			if (state.user) {
				socket.send(
					JSON.stringify({
						type: 'updateUser',
						payload: {
							telegram_id: state.user.telegram_id,
							energy: action.payload.energy,
							balance: action.payload.balance,
							friends: state.user.friends,
						},
					})
				)
			}
		},
	},
})

export const { setUser, updateUser } = websocketSlice.actions

let socket: WebSocket

export const setupWebSocket =
	(telegramId: string): AppThunk =>
	async dispatch => {
		socket = new WebSocket(
			`ws://api.meowcatcoinbot.ru/api/v1/users/ws/${telegramId}`
		)

		socket.onopen = () => {
			socket.send(JSON.stringify({ type: 'getUser' }))
		}

		socket.onmessage = event => {
			const data = JSON.parse(event.data)
			if (data.type === 'user') {
				dispatch(setUser(data.payload))
			} else if (data.type === 'userUpdated') {
				dispatch(setUser(data.payload))
			}
		}

		socket.onclose = () => {
			console.log('WebSocket connection closed')
		}

		socket.onerror = error => {
			console.error('WebSocket error', error)
		}
	}

export const { reducer, actions } = websocketSlice
