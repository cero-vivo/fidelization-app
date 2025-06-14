import { IWalletActions } from "../model/actions/IWalletActions";
import { IWallet } from "../model/entities/IWallet";

export const WalletActions: (wallet: IWallet) => IWalletActions = (wallet) => {
    return {
        getters: {
            getWalletBalance: () => wallet.cash,
            getWalletCards: () => wallet.associatedCards,
            getDefaultCard: () => wallet.associatedCards.find(card => card.isDefault) || null,
            isWalletEnabled: () => wallet.isEnabled
        },
        setters: {
            setWalletBalance: (balance: number) => {
                wallet.cash = balance;
            },
            setWalletCards: (cards) => {
                wallet.associatedCards = cards;
            },
            setDefaultCard: (cardId: string) => {
                const card = wallet.associatedCards.find(c => c.id === cardId);
                if (card) {
                    wallet.associatedCards.forEach(c => c.isDefault = false);
                    card.isDefault = true;
                } else {
                    throw new Error("Card not found");
                }
            },
            setIsEnabled: (isEnabled: boolean) => {
                wallet.isEnabled = isEnabled;
            }
        },
        cashActions: {
            addCash: (amount: number) => {
                wallet.cash + amount;
            },
            removeCash: (amount: number) => {
                if (wallet.cash >= amount) {
                    wallet.cash - amount
                } else {
                    throw new Error("Insufficient cash balance");
                }
            }
        },
        cardActions: {
            addCard: (card) => {
                wallet.associatedCards.push(card);
            },
            removeCard: (cardId: string) => {
                wallet.associatedCards = wallet.associatedCards.filter(c => c.id !== cardId);
            },
            updateCard: (cardId: string, updatedCard) => {
                wallet.associatedCards = wallet.associatedCards.map(card => {
                    if (card.id === cardId) return { ...card, ...updatedCard };
                    return card;
                })
            },
            setDefaultCard: (cardId:string) => {
                wallet.associatedCards = wallet.associatedCards?.map( card => {
                    if(card?.id === cardId) return { ...card, isDefault: true }
                    return { ...card, isDefault: false }
                })
            }
        },
        enable: () => {
            wallet.isEnabled = true;
        },
        disable: () => {
            wallet.isEnabled = false;
        }
    }
}