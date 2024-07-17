import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './api/user'

const reducers = combineReducers({
	[userApi.reducerPath]: userApi.reducer,
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
