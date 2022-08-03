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

export type User = {
    id: number
    name: string
    email: string
}

export type Account = {
    id: number
    phone: number
    user?: User
    user_id: number
}

export type Transaction = {
    id: number
    status: Status
    description: string
    destination: string
    type: string
    amount: number
    created_at: string
    updated_at: string
    payment?: Payment
    account?: Account
}

export type Payment = {
    id: number
    payment_id: number
    amount: number
    type: string
    subtype: string
    status: Status
    updated_at: string
    transaction_id: number
}

export type PersonalAccount = {
    id: number
}

export type PersonalAccountTransaction = {
    id: number
}