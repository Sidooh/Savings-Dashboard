import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { CollectiveInvestment, PersonalAccount, PersonalAccountTransaction, SubInvestment } from 'utils/types';

export const personalAccountApi = createApi({
    reducerPath: 'personalAccountApi',
    keepUnusedDataFor: 60 * 5, // 5 minutes
    tagTypes: ['PersonalAccount', 'PersonalAccountTransaction', 'PersonalCollectiveInvestment'],
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
        //  Earning Endpoints
        getPersonalAccounts: builder.query<PersonalAccount[], void>({
            query: () => '?with_relations=account',
            transformResponse: (response: { data: PersonalAccount[] }) => response.data,
            providesTags: ['PersonalAccount']
        }),
        getPersonalAccountTransaction: builder.query<PersonalAccountTransaction[], void>({
            query: () => '/transactions/?with_relations=account',
            transformResponse: (response: { data: PersonalAccountTransaction[] }) => response.data,
            providesTags: ['PersonalAccountTransaction']
        }),
        getPersonalCollectiveInvestments: builder.query<CollectiveInvestment[], void>({
            query: () => '/collective-investments',
            transformResponse: (response: { data: CollectiveInvestment[] }) => response.data,
            providesTags: ['PersonalCollectiveInvestment']
        }),
        getPersonalSubInvestments: builder.query<SubInvestment[], void>({
            query: () => '/sub-investments?with_relations=account',
            transformResponse: (response: { data: SubInvestment[] }) => response.data,
            providesTags: ['PersonalCollectiveInvestment']
        })
    })
});

export const {
    useGetPersonalAccountsQuery,
    useGetPersonalAccountTransactionQuery,
    useGetPersonalCollectiveInvestmentsQuery,
    useGetPersonalSubInvestmentsQuery
} = personalAccountApi;