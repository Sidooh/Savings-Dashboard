/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ACCOUNTS_API_URL: string
    readonly VITE_SAVINGS_API_URL: string

    readonly VITE_ACCOUNTS_DASHBOARD_URL: string
    readonly VITE_PRODUCTS_DASHBOARD_URL: string
    readonly VITE_NOTIFY_DASHBOARD_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
