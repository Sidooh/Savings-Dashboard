import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { CollectiveInvestment, Group, SubInvestment } from 'utils/types';

export const groupsApi = createApi({
    reducerPath: 'groupsApi',
    keepUnusedDataFor: 60 * 5, // 5 minutes
    tagTypes: ['Group', 'GroupCollectiveInvestment', 'GroupSubInvestment'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.savings.api.url}/groups`,
        prepareHeaders: (headers) => {
            const auth = JSON.parse(localStorage.getItem('auth') || '{}');

            if (auth.token) headers.set('Authorization', `Bearer ${auth.token}`);

            return headers;
        }
    }),
    endpoints: builder => ({
        //  Earning Endpoints
        getGroups: builder.query<Group[], void>({
            query: () => '/',
            transformResponse: (response: { data: Group[] }) => response.data,
            providesTags: ['Group']
        }),
        getGroupCollectiveInvestments: builder.query<CollectiveInvestment[], void>({
            query: () => '/collective-investments',
            transformResponse: (response: { data: CollectiveInvestment[] }) => response.data,
            providesTags: ['GroupCollectiveInvestment']
        }),
        getGroupSubInvestments: builder.query<SubInvestment[], void>({
            query: () => '/sub-investments?with_relations=group',
            transformResponse: (response: { data: SubInvestment[] }) => response.data,
            providesTags: ['GroupSubInvestment']
        })
    })
});

export const {useGetGroupsQuery, useGetGroupCollectiveInvestmentsQuery, useGetGroupSubInvestmentsQuery} = groupsApi;