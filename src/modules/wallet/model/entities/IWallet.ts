import { ICard } from "./ICard"

export interface IWallet {
    id: string
    walletNumber?: string
    cash: number
    isEnabled: boolean
    associatedCards: ICard[]
}