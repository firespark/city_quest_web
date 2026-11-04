import { execFileSync } from 'node:child_process'
import { mkdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { normalizePath } from 'vite'
import { OPEN_GRAPH } from '../src/config/pages.ts'
import { resolvePageMeta, renderPageHead } from '../src/scripts/pageMeta.ts'

const sources = {
  HOME: 'src/screens/MainScreen.tsx',
  ABOUT: 'src/screens/AboutScreen.tsx',
  HOW_PLAY: 'src/screens/HowPlayScreen.tsx',
  CONTACTS: 'src/screens/ContactsScreen.tsx',
  USER_AGREEMENT: 'src/screens/UserAgreementScreen.tsx',
  PRIVACY_POLICY: 'src/screens/PrivacyPolicyScreen.tsx',
}

function git(root, args) {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    return ''
  }
}

export function seoManifest({ siteUrl, pages, manifestPath }) {
  let root

  return {
    name: 'seo-manifest',
    configResolved(config) {
      root = config.root
    },
    transformIndexHtml(html) {
      const head = renderPageHead(resolvePageMeta(pages.HOME.meta, '/', siteUrl))
      return html.replace(/(<!-- page-meta:start -->)[\s\S]*?(<!-- page-meta:end -->)/, (_, start, end) => `${start}\n    ${head}\n    ${end}`)
    },
    generateBundle() {
      const moduleIds = [...this.getModuleIds()]
      const byFile = new Map(moduleIds.map(id => [normalizePath(id.split('?')[0]), id]))
      const changed = new Set(git(root, ['diff', '--name-only', 'HEAD', '--']).split(/\r?\n/).filter(Boolean))
      const untracked = git(root, ['ls-files', '--others', '--exclude-standard']).split(/\r?\n/).filter(Boolean)
      untracked.forEach(file => changed.add(file))

      const dependencies = source => {
        const pending = [byFile.get(normalizePath(resolve(root, source)))].filter(Boolean)
        const visited = new Set()
        const files = new Set()

        while (pending.length) {
          const id = pending.pop()
          if (visited.has(id)) continue
          visited.add(id)
          const file = id.split('?')[0]
          const local = normalizePath(relative(root, file))
          if (local.startsWith('..') || local.startsWith('node_modules/') || id.startsWith('\0')) continue
          files.add(local)
          pending.push(...(this.getModuleInfo(id)?.importedIds ?? []))
        }
        return [...files]
      }

      const manifest = {
        siteUrl,
        openGraph: OPEN_GRAPH,
        routes: Object.entries(pages).map(([key, page]) => ({ key, path: page.path, meta: page.meta })),
        reservedPaths: Object.values(pages).map(page => page.path).filter(path => !/[:*]/.test(path)),
        pages: Object.entries(pages)
          .filter(([, page]) => !/[:*]/.test(page.path) && !/\b(?:noindex|none)\b/i.test(page.meta.robots))
          .map(([key, page]) => {
            const shared = [
              'src/components/header/Header.tsx',
              'src/components/footer/Footer.tsx',
              'src/LayoutMeta.tsx',
              'src/index.css',
            ]
            const files = sources[key]
              ? [...new Set([sources[key], ...shared].flatMap(source => dependencies(source)))]
              : []
            const committed = files.length ? git(root, ['log', '-1', '--format=%cI', '--', ...files]) : ''
            const dates = committed ? [new Date(committed).getTime()] : []
            for (const file of files) {
              if (changed.has(file)) dates.push(statSync(resolve(root, file)).mtimeMs)
            }
            const latest = Math.max(...dates)
            return {
              key,
              path: page.path,
              ...(Number.isFinite(latest) ? { lastmod: new Date(latest).toISOString() } : {}),
            }
          }),
      }
      const source = `${JSON.stringify(manifest, null, 2)}\n`
      this.emitFile({ type: 'asset', fileName: 'seo-pages.json', source })
      if (manifestPath) {
        const target = resolve(root, manifestPath)
        mkdirSync(dirname(target), { recursive: true })
        writeFileSync(target, source)
      }
    },
  }
}
