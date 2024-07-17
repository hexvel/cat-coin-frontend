export interface ITopItems {
	id: string
	imageUrl: string
	label: string
	price: string
}

export interface IEarnItems {
	id: string
	label: string
	price: string
	url: string
}

export interface IFriendItems {
	id: string
	friendId: number
	label: string
	price: string
}
