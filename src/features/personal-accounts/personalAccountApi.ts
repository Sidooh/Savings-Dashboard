import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { PersonalAccount, PersonalAccountTransaction } from 'utils/types';

export const personalAccountApi = createApi({
    reducerPath: 'personalAccountApi',
    keepUnusedDataFor: 60 * 5, // 5 minutes
    tagTypes: ['PersonalAccount', 'PersonalAccountTransaction'],
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
        })
    })
});

export const {useGetPersonalAccountsQuery, useGetPersonalAccountTransactionQuery} = personalAccountApi;