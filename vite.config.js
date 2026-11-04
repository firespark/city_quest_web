import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { PAGES } from './src/config/pages.ts'
import { seoManifest } from './build/seo.js'
import { canonicalHomeRedirects } from './build/canonical.js'
import { cwd } from 'node:process'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), '')
  if (!env.VITE_SITE_URL?.trim()) {
    throw new Error('Укажите VITE_SITE_URL в .env.')
  }
  const site = new URL(env.VITE_SITE_URL.trim())
  if (!['http:', 'https:'].includes(site.protocol) || site.pathname !== '/' || site.search || site.hash || site.username || site.password) {
    throw new Error('Адрес сайта должен содержать только http(s) и домен.')
  }
  const backend = env.SITEMAP_BACKEND_URL || (env.VITE_API_URL ? new URL(env.VITE_API_URL).origin : site.origin)
  const proxy = {
    '/sitemap.xml': { target: backend, changeOrigin: true },
    '/robots.txt': { target: backend, changeOrigin: true },
  }

  return {
    plugins: [react(), canonicalHomeRedirects(), seoManifest({ siteUrl: site.origin, pages: PAGES, manifestPath: env.SITEMAP_MANIFEST_PATH })],
    define: { 'import.meta.env.VITE_SITE_URL': JSON.stringify(site.origin) },
    server: { proxy },
    preview: { proxy },
  }
})
