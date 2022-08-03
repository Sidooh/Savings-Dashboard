import { RouteType } from "utils/types";
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
                active: true
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
                to: '/earnings/cashbacks',
                active: true
            },
            {
                name: 'Sub Investments',
                icon: faCoins,
                to: '/earnings/cashbacks',
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
                to: '/subscriptions-types',
                active: true
            },
            {
                name: 'Accounts',
                icon: faUsersLine,
                to: '/group-accounts',
                active: true
            },
            {
                name: 'Transactions',
                icon: faGlobe,
                to: '/group-accounts/transactions',
                active: true
            },
            {
                name: 'Collective Investments',
                icon: faHandHoldingDollar,
                to: '/earnings/cashbacks',
                active: true
            },
            {
                name: 'Sub Investments',
                icon: faCoins,
                to: '/earnings/cashbacks',
                active: true
            },
        ]
    },
];

export default routes;