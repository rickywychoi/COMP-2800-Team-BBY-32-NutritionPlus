/**
 * Configures the server to run next app.
 * 
 * Uses proxy middleware to resolve CORS error
 * @see https://www.npmjs.com/package/http-proxy-middleware
 */

const next = require('next')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
// list of pathnames to access via proxy
const proxyObj = {
  '/v2/top-headlines': {
    target: 'https://newsapi.org',
    changeOrigin: true
  },
  '/search': {
    target: 'https://api.edamam.com',
    changeOrigin: true
  }
}

app.prepare()
.then(() => {
  // express
  const server = express()
  
  // uses proxy as middleware to resolve CORS error - ensure same origin
  if (proxyObj) {
    Object.keys(proxyObj).forEach(context => {
      server.use(createProxyMiddleware(context, proxyObj[context]))
    })
  }

  // handles pages to be rendered
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  const port = process.env.PORT || 3000;
  
  // listens to port
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})