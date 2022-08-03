import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { PersonalAccountTransaction } from '../../utils/types';

type DashboardSummariesData = {
    amount_group_accounts: number
    amount_group_accounts_today: number
    amount_personal_accounts: number
    amount_personal_accounts_today: number
    count_group_accounts: number
    count_group_accounts_today: number
    count_personal_accounts: number
    count_personal_accounts_today: number
}

export const savingsApi = createApi({
    reducerPath: 'savingsApi',
    keepUnusedDataFor: 60 * 5, // 5 minutes
    tagTypes: ['Group', 'GroupCollectiveInvestment', 'GroupSubInvestment', 'RecentPersonalAccountTransaction'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.savings.api.url}/dashboard`,
        prepareHeaders: (headers) => {
            const auth = JSON.parse(localStorage.getItem('auth') || '{}');

            if (auth.token) headers.set('Authorization', `Bearer ${auth.token}`);

            return headers;
        }
    }),
    endpoints: builder => ({
        //  Earning Endpoints
        getDashboardSummaries: builder.query<DashboardSummariesData, void>({
            query: () => '/summaries',
            transformResponse: (response: { data: DashboardSummariesData }) => response.data,
            providesTags: ['Group']
        }),
        getRecentPersonalAccountTransaction: builder.query<PersonalAccountTransaction[], void>({
            query: () => '/recent-transactions',
            transformResponse: (response: { data: PersonalAccountTransaction[] }) => response.data,
            providesTags: ['RecentPersonalAccountTransaction']
        }),
    })
});

export const {useGetDashboardSummariesQuery, useGetRecentPersonalAccountTransactionQuery} = savingsApi;