import { lazy, memo, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Middleware } from '../middleware';
import MainLayout from './MainLayout';
import GuestLayout from './GuestLayout';
import { is } from 'utils/helpers';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';

const Login = lazy(() => import('pages/auth/Login'));
const Dashboard = lazy(() => import('pages/dashboards/default'));
const Analytics = lazy(() => import('pages/dashboards/analytics'));

const PersonalAccounts = lazy(() => import('pages/personal-accounts'));
const PersonalAccountTransactions = lazy(() => import('pages/personal-accounts/Transactions'));
const PersonalCollectiveInvestments = lazy(() => import('pages/personal-accounts/CollectiveInvestments'));
const PersonalSubInvestments = lazy(() => import('pages/personal-accounts/SubInvestments'));

const Groups = lazy(() => import('pages/groups'));
const GroupCollectiveInvestments = lazy(() => import('pages/groups/CollectiveInvestments'));
const GroupSubInvestments = lazy(() => import('pages/groups/SubInvestments'));

const GroupAccounts = lazy(() => import('pages/group-accounts'));
const GroupAccountTransactions = lazy(() => import('pages/group-accounts/Transactions'));

const Layout = () => {
    const HTMLClassList = document.getElementsByTagName('html')[0].classList;

    useEffect(() => {
        if (is.windows()) HTMLClassList.add('windows');
        if (is.chrome()) HTMLClassList.add('chrome');
        if (is.firefox()) HTMLClassList.add('firefox');
    }, [HTMLClassList]);

    return (
        <>
            <Routes>
                <Route element={<GuestLayout/>}>
                    <Route path={'/login'} element={<Middleware.Guest component={<Login/>}/>}/>
                </Route>

                <Route element={<Middleware.Auth component={<MainLayout/>}/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path={'/dashboard'} element={<Dashboard/>}/>
                    <Route path={'/dashboard/analytics'} element={<Analytics/>}/>

                    <Route path={'/personal-accounts'} element={<PersonalAccounts/>}/>
                    <Route path={'/personal-accounts/transactions'} element={<PersonalAccountTransactions/>}/>
                    <Route path={'/personal-accounts/collective-investments'} element={<PersonalCollectiveInvestments/>}/>
                    <Route path={'/personal-accounts/sub-investments'} element={<PersonalSubInvestments/>}/>

                    <Route path={'/group-accounts'} element={<GroupAccounts/>}/>
                    <Route path={'/group-accounts/transactions'} element={<GroupAccountTransactions/>}/>

                    <Route path={'/groups'} element={<Groups/>}/>
                    <Route path={'/groups/collective-investments'} element={<GroupCollectiveInvestments/>}/>
                    <Route path={'/groups/sub-investments'} element={<GroupSubInvestments/>}/>

                    <Route path={'*'} element={<Dashboard/>}/>
                </Route>
            </Routes>
            <SettingsToggle/>
            <SettingsPanel/>
        </>
    );
};

export default memo(Layout);