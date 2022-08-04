import { CONFIG } from 'config';

export type WaffleLinkType = {
    avatar?: string
    avatarText?: string
    title?: string
    link?: string
    img?: string
    hr?: boolean
    contentClass?: string
    enabled?: boolean
}

export const waffleLinks: WaffleLinkType[] = [
    {
        avatarText: 'A',
        title: 'Accounts',
        link: CONFIG.sidooh.services.accounts.dashboard.url,
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
    {
        avatarText: 'E',
        title: 'Enterprise',
        link: `/events/event-detail`,
        contentClass: 'bg-soft-primary text-primary',
    },
    {
        avatarText: 'N',
        title: 'Notify',
        link: CONFIG.sidooh.services.notify.dashboard.url,
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
    {
        avatarText: 'P',
        title: 'Payments',
        link: CONFIG.sidooh.services.payments.dashboard.url,
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
    {
        avatarText: 'P',
        title: 'Products',
        link: CONFIG.sidooh.services.products.dashboard.url,
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
    {
        avatarText: 'U',
        title: 'USSD',
        link: CONFIG.sidooh.services.ussd.dashboard.url,
        contentClass: 'bg-soft-primary text-primary',
        enabled: true
    },
];
