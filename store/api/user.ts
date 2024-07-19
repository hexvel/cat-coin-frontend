import {
  IFriendResponse,
  IUser,
  IUserResponse,
  IUserUpdate,
} from '@/types/user.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.meowcatcoinbot.ru/v1',
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

    getTopUsers: builder.query<IUserResponse, string>({
      query: filterBy => `/users/top/${filterBy}`,
    }),

    updateUser: builder.mutation<IUser, Partial<IUserUpdate>>({
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
  useGetTopUsersQuery,
} = userApi
