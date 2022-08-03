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
        getGroupAccounts: builder.query<GroupAccount[], void>({
            query: () => '?with_relations=account',
            transformResponse: (response: { data: GroupAccount[] }) => response.data,
            providesTags: ['GroupAccount']
        }),
        getGroupAccountTransaction: builder.query<GroupAccountTransaction[], void>({
            query: () => '/transactions/?with_relations=account',
            transformResponse: (response: { data: GroupAccountTransaction[] }) => response.data,
            providesTags: ['GroupAccountTransaction']
        })
    })
});

export const {useGetGroupAccountsQuery, useGetGroupAccountTransactionQuery} = groupAccountApi;