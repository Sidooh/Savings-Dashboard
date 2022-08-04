export const CONFIG = {
    sidooh: {
        services: {
            accounts: {
                api: {
                    url: import.meta.env.VITE_ACCOUNTS_API_URL
                },
                dashboard: {
                    url: import.meta.env.VITE_ACCOUNTS_DASHBOARD_URL
                }
            },
            products: {
                dashboard: {
                    url: import.meta.env.VITE_PRODUCTS_DASHBOARD_URL
                }
            },
            payments: {
                dashboard: {
                    url: import.meta.env.VITE_PAYMENTS_DASHBOARD_URL
                }
            },
            notify: {
                dashboard: {
                    url: import.meta.env.VITE_NOTIFY_DASHBOARD_URL
                }
            },
            savings: {
                api: {
                    url: import.meta.env.VITE_SAVINGS_API_URL
                }
            },
            ussd: {
                dashboard: {
                    url: import.meta.env.VITE_USSD_DASHBOARD_URL
                }
            },
        },

        tagline: 'Sidooh, Makes You Money with Every Purchase!',
        version: '2.0'
    }
};