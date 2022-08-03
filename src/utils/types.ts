import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Status } from './enums';
import { OverridableStringUnion } from '@mui/types';
import { ChipPropsColorOverrides } from '@mui/material/Chip/Chip';

export type RouteChildType = {
    name: string
    active: boolean
    icon?: IconProp
    to?: string
    exact?: boolean
    badge?: {
        text?: string
        type?: OverridableStringUnion<'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
            ChipPropsColorOverrides>
    }
    children?: RouteChildType[]
}

export type RouteType = {
    label: string
    labelDisable?: boolean
    children: RouteChildType[]
}

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

export type Payment = {
    payment_id: number
    amount: number
    type: string
    subtype: string
    status: Status
    transaction_id: number
}

export type PersonalAccount = Model & {
    type: string
}

export type PersonalAccountTransaction = Transaction & {
    personal_account?: PersonalAccount
}

export type Group = Model & {
    name: string
}
export type GroupAccount = Model & {
    balance: number
    group: Group
}

export type GroupAccountTransaction = Transaction & {
    group_account?: GroupAccount
}