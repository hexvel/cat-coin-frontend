import {
	Action,
	combineReducers,
	configureStore,
	ThunkAction,
} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './api/user'
import { reducer as websocketSliceReducer } from './slice/websocketSlice'

const reducers = combineReducers({
	[userApi.reducerPath]: userApi.reducer,
	websocket: websocketSliceReducer,
})

export const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware().concat(userApi.middleware)
	},
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
