import {
  IFriend,
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

    getUserFriends: builder.query<IFriend[], number>({
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

    joinChannel: builder.mutation<
      void,
      { channel_id: string; telegram_id: string }
    >({
      query: ({ channel_id, telegram_id }) => ({
        url: `/users/earn/joinChannel`,
        method: 'POST',
        body: { channel_id, telegram_id },
      }),
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetUserFriendsQuery,
  useJoinChannelMutation,
  useGetTopUsersQuery,
} = userApi
