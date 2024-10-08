import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { GroupAccount, GroupAccountTransaction } from 'utils/types';

export const groupAccountApi = createApi({
    reducerPath: 'groupAccountApi',
    keepUnusedDataFor: 60 * 5, // 5 minutes
    tagTypes: ['GroupAccount', 'GroupAccountTransaction'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.savings.api.url}/group-accounts`,
        prepareHeaders: (headers) => {
            const auth = JSON.parse(localStorage.getItem('auth') || '{}');

            if (auth.token) headers.set('Authorization', `Bearer ${auth.token}`);

            return headers;
        }
    }),
    endpoints: builder => ({
        //  Earning Endpoints
        getGroupAccount: builder.query<GroupAccount, number>({
            query: id => `/${id}?with_relations=account,group`,
            transformResponse: (response: { data: GroupAccount }) => response.data,
            providesTags: ['GroupAccount']
        }),
        getGroupAccounts: builder.query<GroupAccount[], void>({
            query: () => '?with_relations=account,group',
            transformResponse: (response: { data: GroupAccount[] }) => response.data,
            providesTags: ['GroupAccount']
        }),
        getGroupAccountTransactions: builder.query<GroupAccountTransaction[], void>({
            query: () => '/transactions/?with_relations=account,group',
            transformResponse: (response: { data: GroupAccountTransaction[] }) => response.data,
            providesTags: ['GroupAccountTransaction']
        }),
        getGroupAccountTransaction: builder.query<GroupAccountTransaction, number>({
            query: id => `/transactions/${id}/?with_relations=account`,
            transformResponse: (response: { data: GroupAccountTransaction }) => response.data,
            providesTags: ['GroupAccountTransaction']
        })
    })
});

export const {
    useGetGroupAccountQuery,
    useGetGroupAccountsQuery,
    useGetGroupAccountTransactionsQuery,
    useGetGroupAccountTransactionQuery
} = groupAccountApi;