import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import themeReducer from 'features/theme/themeSlice';
import { personalAccountApi } from 'features/personal-accounts/personalAccountApi';
import { groupAccountApi } from 'features/group-accounts/groupAccountApi';
import { groupsApi } from '../features/groups/groupsApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,

        [personalAccountApi.reducerPath]: personalAccountApi.reducer,
        [groupAccountApi.reducerPath]: groupAccountApi.reducer,
        [groupsApi.reducerPath]: groupsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(personalAccountApi.middleware, groupAccountApi.middleware, groupsApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
