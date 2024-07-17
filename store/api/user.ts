import { IFriendResponse, IUser, IUserResponse } from '@/types/user.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.meowcatcoinbot.ru/api/v1',
	}),
	tagTypes: ['User'],
	endpoints: builder => ({
		getUsers: builder.query<IUserResponse, void>({
			query: () => '/users',
		}),

		getUser: builder.query<IUser, number>({
			query: id => `/users/${id}`,
		}),

		getUserFriends: builder.query<IFriendResponse, number>({
			query: id => `/users/${id}/friends`,
		}),

		updateUser: builder.mutation<IUser, Partial<IUser>>({
			query: user => ({
				url: `/users/${user.telegram_id}`,
				method: 'PUT',
				body: user,
			}),
		}),
	}),
})

export const {
	useGetUsersQuery,
	useGetUserQuery,
	useUpdateUserMutation,
	useGetUserFriendsQuery,
} = userApi
