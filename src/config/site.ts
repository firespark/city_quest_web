import { OPEN_GRAPH } from './pages'

export const SITE = {
    name: OPEN_GRAPH.siteName,
    url: import.meta.env.VITE_SITE_URL
} as const
