import { RouteType } from "@nabcellent/sui-react";
import {
    faCoins,
    faGlobe,
    faHandHoldingDollar,
    faPeopleLine,
    faPieChart,
    faUsersLine
} from '@fortawesome/free-solid-svg-icons';

const routes: RouteType[] = [
    {
        label: 'Dashboard',
        labelDisable: true,
        children: [
            {
                name: 'Dashboard',
                active: true,
                icon: faPieChart,
                children: [
                    {
                        name: 'Home',
                        to: '/',
                        exact: true,
                        active: true
                    },
                ]
            }
        ]
    },
    {
        label: 'Personal',
        children: [
            {
                name: 'Accounts',
                icon: faUsersLine,
                to: '/personal-accounts',
                active: true,
                exact: true,
            },
            {
                name: 'Transactions',
                icon: faGlobe,
                to: '/personal-accounts/transactions',
                active: true
            },
            {
                name: 'Collective Investments',
                icon: faHandHoldingDollar,
                to: '/personal-accounts/collective-investments',
                active: true
            },
            {
                name: 'Sub Investments',
                icon: faCoins,
                to: '/personal-accounts/sub-investments',
                active: true
            },
        ]
    },
    {
        label: 'Group',
        children: [
            {
                name: 'Groups',
                icon: faPeopleLine,
                to: '/groups',
                active: true,
                exact: true,
            },
            {
                name: 'Accounts',
                icon: faUsersLine,
                to: '/group-accounts',
                active: true,
                exact: true,
            },
            {
                name: 'Transactions',
                icon: faGlobe,
                to: '/group-accounts/transactions',
                active: true,
                exact: true,
            },
            {
                name: 'Collective Investments',
                icon: faHandHoldingDollar,
                to: '/groups/collective-investments',
                active: true
            },
            {
                name: 'Sub Investments',
                icon: faCoins,
                to: '/groups/sub-investments',
                active: true
            },
        ]
    },
];

export default routes;