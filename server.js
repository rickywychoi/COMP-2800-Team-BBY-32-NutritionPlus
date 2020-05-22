const express = require('express')
const next = require('next')
const cors = require('cors')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare()
.then(() => {
  const server = express()

  // server.use(cors())

  server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
    
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