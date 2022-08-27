import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { PersonalAccountTransaction } from 'utils/types';

export const personalAccountTransactionApi = createApi({
    reducerPath: 'personalAccountTransactionApi',
    keepUnusedDataFor: 60 * 5, // 5 minutes
    tagTypes: ['PersonalAccountTransaction'],
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://api.sidooh.com/v1/savings',
        baseUrl: `${CONFIG.sidooh.services.savings.api.url}/personal-accounts`,
        prepareHeaders: (headers) => {
            const auth = JSON.parse(localStorage.getItem('auth') || '{}');

            if (auth.token) headers.set('Authorization', `Bearer ${auth.token}`);

            return headers;
        }
    }),
    endpoints: builder => ({
        getPersonalAccountTransactions: builder.query<PersonalAccountTransaction[], void>({
            query: () => '/transactions/?with_relations=account',
            transformResponse: (response: { data: PersonalAccountTransaction[] }) => response.data,
            providesTags: ['PersonalAccountTransaction']
        }),
        getPersonalAccountTransaction: builder.query<PersonalAccountTransaction, number>({
            query: (id: number) => `/transactions/${id}?with_relations=account`,
            transformResponse: (response: { data: PersonalAccountTransaction }) => response.data,
            providesTags: ['PersonalAccountTransaction']
        }),
    })
});

export const {
    useGetPersonalAccountTransactionsQuery,
    useGetPersonalAccountTransactionQuery,
} = personalAccountTransactionApi;