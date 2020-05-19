const express = require('express')
const next = require('next')
const { parse } = require('url')
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')
const subscriptionHandler = require('./subscriptionHandler')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
      // console.log(parsedUrl)

      if (!pathname.includes("/subscription")) {
        return handle(req, res)
      }
    })

    server.use(
      cors({
        origin(origin, cb) {
          const whitelist = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : [];
          cb(null, whitelist.includes(origin));
        },
        credentials: true
      })
    )
    
    server.use(compression());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    server.post("/subscription", subscriptionHandler.handlePushNotificationSubscription);
    server.get("/subscription/:id", subscriptionHandler.sendPushNotification);

    const port = 3000

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })