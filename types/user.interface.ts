export interface IFriend {
  telegram_id: number
  full_name: string
}

export interface IFriendResponse {
  users: IFriend[]
}

export interface IUser {
  telegram_id: string
  full_name: string
  balance: number
  energy: number
  friends: IFriendResponse
  last_update: string
}

export interface IUserUpdate {
  telegram_id: string
  full_name: string
  balance: string
  energy: number
  friends: IFriendResponse
}

export interface IUserResponse {
  users: IUser[]
}
