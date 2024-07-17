import type { AppDispatch, RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'

export const useTypedSelector = useSelector.withTypes<RootState>()
export const useTypedDispatch = useDispatch.withTypes<AppDispatch>()
