import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { is, PageLoader } from '@nabcellent/sui-react';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';
import GuestLayout from './layouts/GuestLayout';
import MainLayout from './layouts/MainLayout';
import { Middleware } from './middleware';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import useTheme from './hooks/useTheme';

const Login = lazy(() => import('pages/auth/Login'));
const Dashboard = lazy(() => import('pages/dashboards/default'));
const Analytics = lazy(() => import('pages/dashboards/analytics'));

const PersonalAccounts = lazy(() => import('pages/personal-accounts'));
const ViewPersonalAccount = lazy(() => import('pages/personal-accounts/Show'));
const PersonalAccountTransactions = lazy(() => import('pages/personal-accounts/Transactions'));
const ViewPersonalAccountTransaction = lazy(() => import('pages/personal-accounts/ViewTransaction'));
const PersonalCollectiveInvestments = lazy(() => import('pages/personal-accounts/CollectiveInvestments'));
const PersonalSubInvestments = lazy(() => import('pages/personal-accounts/SubInvestments'));

const Groups = lazy(() => import('pages/groups'));
const ViewGroup = lazy(() => import('pages/groups/Show'));
const GroupCollectiveInvestments = lazy(() => import('pages/groups/CollectiveInvestments'));
const GroupSubInvestments = lazy(() => import('pages/groups/SubInvestments'));

const GroupAccounts = lazy(() => import('pages/group-accounts'));
const ViewGroupAccount = lazy(() => import('pages/group-accounts/Show'));
const GroupAccountTransactions = lazy(() => import('pages/group-accounts/Transactions'));
const ViewGroupAccountTransactions = lazy(() => import('pages/group-accounts/ViewTransaction'));

const App = () => {
    const HTMLClassList = document.getElementsByTagName('html')[0].classList;

    useEffect(() => {
        if (is.windows()) HTMLClassList.add('windows');
        if (is.chrome()) HTMLClassList.add('chrome');
        if (is.firefox()) HTMLClassList.add('firefox');
    }, [HTMLClassList]);

    const { isDark } = useAppSelector((state: RootState) => state.theme);
    const { isLoaded } = useTheme(isDark);

    if (!isLoaded) return <PageLoader isDark={isDark}/>;

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
                    <Route path={'/personal-accounts/:id'} element={<ViewPersonalAccount/>}/>
                    <Route path={'/personal-accounts/transactions'} element={<PersonalAccountTransactions/>}/>
                    <Route path={'/personal-accounts/transactions/:id'} element={<ViewPersonalAccountTransaction/>}/>
                    <Route path={'/personal-accounts/collective-investments'}
                           element={<PersonalCollectiveInvestments/>}/>
                    <Route path={'/personal-accounts/sub-investments'} element={<PersonalSubInvestments/>}/>

                    <Route path={'/group-accounts'} element={<GroupAccounts/>}/>
                    <Route path={'/group-accounts/:id'} element={<ViewGroupAccount/>}/>
                    <Route path={'/group-accounts/transactions'} element={<GroupAccountTransactions/>}/>
                    <Route path={'/group-accounts/transactions/:id'} element={<ViewGroupAccountTransactions/>}/>

                    <Route path={'/groups'} element={<Groups/>}/>
                    <Route path={'/groups/:id'} element={<ViewGroup/>}/>
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

export default App;