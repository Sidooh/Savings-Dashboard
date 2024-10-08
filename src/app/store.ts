import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import themeReducer from 'features/theme/themeSlice';
import { personalAccountApi } from 'features/personal-accounts/personalAccountApi';
import { groupAccountApi } from 'features/group-accounts/groupAccountApi';
import { groupsApi } from '../features/groups/groupsApi';
import { savingsApi } from '../features/savings/savingsApi';
import { personalAccountTransactionApi } from '../features/personal-account-transactions/personalAccountTransactionApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,

        [personalAccountApi.reducerPath]: personalAccountApi.reducer,
        [groupAccountApi.reducerPath]: groupAccountApi.reducer,
        [groupsApi.reducerPath]: groupsApi.reducer,
        [savingsApi.reducerPath]: savingsApi.reducer,
        [personalAccountTransactionApi.reducerPath]: personalAccountTransactionApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(
            personalAccountApi.middleware,
            groupsApi.middleware,
            groupAccountApi.middleware,
            savingsApi.middleware,
            personalAccountTransactionApi.middleware
        )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
