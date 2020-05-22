const next = require('next')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare()
.then(() => {
  const server = express()
  
  server.use(
    createProxyMiddleware("/v2/top-headlines", {
      target: "https://newsapi.org",
      changeOrigin: true
    })
  )

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  const port = process.env.SERVER_PORT || 3000;
    
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})