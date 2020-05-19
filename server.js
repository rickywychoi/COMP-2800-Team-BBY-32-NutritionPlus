const express = require('express')
const next = require('next')
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

    // post request for subscription of push notification
    server.post("/subscription", subscriptionHandler.handlePushNotificationSubscription);
    // get request for sending push notification
    server.get("/subscription/:id", subscriptionHandler.sendPushNotification);
    
    // to handle rendering of pages
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    const port = process.env.PORT || 3000

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })