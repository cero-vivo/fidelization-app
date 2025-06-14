export interface ICard extends ICardProperties {
    id: string;
    getters?: ICardGetters
    setters?: ICardSetters
    actions?: ICardActions
}
export interface ICardProperties {
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
    isDefault?: boolean;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    type?: 'credit' | 'debit';
    bankName?: string;
}
export interface ICardActions {
}
export interface ICardGetters {
    getCardById: (cardId: string) => ICard | null;
    getAllCards: () => ICard[];
    getDefaultCard: () => ICard | null;
    isCardActive: (cardId: string) => boolean;
    isCardDefault: (cardId: string) => boolean;
}
export interface ICardSetters {
    setCardDetails: (cardId: string, cardDetails: Partial<ICard>) => void;
    setDefaultCard: (cardId: string) => void;
    setCardActiveStatus: (cardId: string, isActive: boolean) => void;
}