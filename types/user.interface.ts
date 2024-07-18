export interface IFriend {
  telegram_id: number
  full_name: string
}

export interface IFriendResponse {
  users: IFriend[]
}

export interface IUser {
  telegram_id: number
  full_name: string
  balance: number
  energy: number
  friends: IFriendResponse
}

export interface IUserResponse {
  users: IUser[]
}
