import { ICard } from "../entities/ICard";

export interface IWalletActions {
    getters: IWalletGetters;
    setters: IWalletSetters;
    cardActions: IWalletCardActions;
    cashActions: IWalletCashActions; 
    enable: () => void;
    disable: () => void;
}
export interface IWalletSetters {
    setWalletBalance: (balance: number) => void;
    setWalletCards: (cards: ICard[]) => void;
    setDefaultCard: (cardId: string) => void;
    setIsEnabled: (isEnabled: boolean) => void;
}
export interface IWalletGetters {
    getWalletBalance: () => number;
    getWalletCards: () => ICard[];
    getDefaultCard: () => ICard | null;
    isWalletEnabled: () => boolean;
}
export interface IWalletCardActions {
    addCard: (card: ICard) => void;
    removeCard: (cardId: string) => void;
    updateCard: (cardId: string, updatedCard: Partial<ICard>) => void;
    setDefaultCard: (cardId: string) => void;
}
export interface IWalletCashActions {
    addCash: (amount: number) => void
    removeCash: (amount: number) => void;
}