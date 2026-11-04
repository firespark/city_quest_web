export function redirectHomeAliases(request, response, next) {
  if (!['GET', 'HEAD'].includes(request.method)) return next()

  const [rawPath] = (request.url || '/').split('?')
  let path
  try {
    path = decodeURIComponent(rawPath)
  } catch {
    return next()
  }
  if (!/^\/+index\.(?:php|html?)\/*$/i.test(path)) return next()

  // Vite's HTML proxy requests are script resources, not page visits.
  const queryIndex = request.url.indexOf('?')
  const query = queryIndex === -1 ? '' : request.url.slice(queryIndex)
  if (new URLSearchParams(query).has('html-proxy')) return next()

  response.statusCode = 301
  response.setHeader('Location', `/${query}`)
  response.end()
}

export function canonicalHomeRedirects() {
  return {
    name: 'canonical-home-redirects',
    configureServer(server) {
      server.middlewares.use(redirectHomeAliases)
    },
    configurePreviewServer(server) {
      server.middlewares.use(redirectHomeAliases)
    },
  }
}
