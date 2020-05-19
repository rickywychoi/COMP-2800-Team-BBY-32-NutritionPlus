const subscriptions = {};

var crypto = require("crypto");
const webpush = require("web-push");

const vapidKeys = {
  publicKey: 'BF_zvHxJwpuDRgxqfTNzE3yak8taTnqrY8YsneF2rFzRYc5Nzz1iNjgKTJjcD3A9Wxgw4TxLdWGayMGPhYAbpn0',
  privateKey: 'yvS5Aizn1LC0rY030fOp8P05hWcbe8LYT9iea8-6PqY'
}

webpush.setVapidDetails("mailto:example@yourdomain.org", vapidKeys.publicKey, vapidKeys.privateKey);

const createHash = (input) => {
  const md5sum = crypto.createHash("md5");
  md5sum.update(Buffer.from(input));
  return md5sum.digest("hex");
}

const handlePushNotificationSubscription = (req, res) => {
  const subscriptionRequest = req.body;
  const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
  subscriptions[susbscriptionId] = subscriptionRequest;

  // console.log("sendPushNotification", subscriptions)
  
  res.status(201).json({ id: susbscriptionId });
}

const sendPushNotification = (req, res) => {
  console.log("???????????")
  const subscriptionId = req.params.id;
  
  console.log("sendPushNotification", subscriptionId)
  
  const pushSubscription = subscriptions[subscriptionId];
  webpush
    .sendNotification(
      pushSubscription,
      JSON.stringify({
        title: "New Product Available ",
        text: "HEY! Take a look at this brand new t-shirt!",
        image: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
        tag: "new-product",
        url: "/new-product-jason-leung-HM6TMmevbZQ-unsplash.html"
      })
    )

  res.status(202).json({});
}

module.exports = { handlePushNotificationSubscription, sendPushNotification };
