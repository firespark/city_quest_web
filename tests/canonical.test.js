import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { test } from 'node:test'
import { redirectHomeAliases } from '../build/canonical.js'

test('home aliases return 301, preserve queries and leave other requests alone', async () => {
  const server = createServer((request, response) => {
    redirectHomeAliases(request, response, () => response.end('page'))
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const origin = `http://127.0.0.1:${server.address().port}`
  try {
    for (const path of ['/index.php', '/index.html', '/index.htm', '/INDEX.PHP/', '/%69ndex.php']) {
      for (const method of ['GET', 'HEAD']) {
        const response = await fetch(origin + path, { method, redirect: 'manual' })
        assert.equal(response.status, 301, `${method} ${path}`)
        assert.equal(response.headers.get('location'), '/')
      }
    }
    const query = '?utm_source=test&value=a%2Bb&value=second'
    const response = await fetch(origin + '/index.html' + query, { redirect: 'manual' })
    assert.equal(response.headers.get('location'), '/' + query)

    for (const path of ['/', '/about', '/sitemap.xml', '/cities/index.php', '/index.php/api/cities/all', '/index.html?html-proxy&index=0.js']) {
      const response = await fetch(origin + path, { redirect: 'manual' })
      assert.equal(response.status, 200, path)
      assert.equal(await response.text(), 'page')
    }
    const post = await fetch(origin + '/index.php', { method: 'POST', redirect: 'manual' })
    assert.equal(post.status, 200)
  } finally {
    await new Promise(resolve => server.close(resolve))
  }
})
