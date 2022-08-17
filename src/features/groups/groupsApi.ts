import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { ApiResponse, CollectiveInvestment, Group, SubInvestment } from 'utils/types';

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
        getGroup: builder.query<Group, number>({
            query: id => `/${id}?with_relations=account`,
            transformResponse: (response: ApiResponse<Group>) => response.data,
            providesTags: ['Group']
        }),
        getGroups: builder.query<Group[], void>({
            query: () => '/',
            transformResponse: (response: ApiResponse<Group[]>) => response.data,
            providesTags: ['Group']
        }),
        getGroupCollectiveInvestments: builder.query<CollectiveInvestment[], void>({
            query: () => '/collective-investments',
            transformResponse: (response: ApiResponse<CollectiveInvestment[]>) => response.data,
            providesTags: ['GroupCollectiveInvestment']
        }),
        getGroupSubInvestments: builder.query<SubInvestment[], void>({
            query: () => '/sub-investments?with_relations=group',
            transformResponse: (response: ApiResponse<SubInvestment[]>) => response.data,
            providesTags: ['GroupSubInvestment']
        })
    })
});

export const {
    useGetGroupQuery,
    useGetGroupsQuery,
    useGetGroupCollectiveInvestmentsQuery,
    useGetGroupSubInvestmentsQuery
} = groupsApi;