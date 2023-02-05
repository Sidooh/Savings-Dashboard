import { Status } from "@nabcellent/sui-react";

export interface ApiResponse<T> {
    result: 1 | 0;
    status: string;
    data: T;
    errors: object[];
}

export type Model = {
    id: number
    created_at: string
    updated_at: string
}

export type User = Model & {
    name: string
    email: string
}

export type Account = Model & {
    phone: number
    user?: User
    user_id: number
}

export type Transaction = Model & {
    status: Status
    description: string
    destination: string
    type: string
    amount: number
    payment?: Payment
    account?: Account
}

export type Payment = Model & {
    payment_id: number
    amount: number
    type: string
    subtype: string
    status: Status
    transaction_id: number
}

export type PersonalAccount = Model & {
    type: string
    description: string
    duration: string
    frequency: string
    account?: Account
    frequency_amount?: number
    balance: number
    interest: number
    target_amount: number
    status: Status
    transactions: PersonalAccountTransaction[]
}

export type PersonalAccountTransaction = Transaction & {
    personal_account?: PersonalAccount
}

export type Group = Model & {
    name: string
    type: string
    frequency: string
    interest: number
    target_amount: number
    frequency_amount: number
    balance: number
    duration: number
    status: Status
    group_accounts: GroupAccount[]
}
export type GroupAccount = Model & {
    group_id: number
    balance: number
    status: Status
    group: Group
    account?: Account
    transactions: GroupAccountTransaction[]
}

export type GroupAccountTransaction = Transaction & {
    group_account?: GroupAccount
}

export type CollectiveInvestment = Model & {
    amount: number
    invested_at: string
    investment_date: string
}

export type SubInvestment = Model & {
    amount: number
    interest: string
    personal_account: PersonalAccount
    group: Group
}