export interface IFriend {
  telegram_id: number
  full_name: string
}

export interface IActionsResponse {
  subscribed_channels: string[]
  friends: IFriend[]
}

export interface IUser {
  telegram_id: string
  full_name: string
  balance: number
  energy: number
  actions: IActionsResponse
  last_update: string
}

export interface IUserUpdate {
  telegram_id: string
  full_name: string
  balance: string
  energy: number
  actions: IActionsResponse
}

export interface IUserResponse {
  users: IUser[]
}
