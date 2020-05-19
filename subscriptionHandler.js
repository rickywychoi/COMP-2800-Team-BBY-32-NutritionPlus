const subscriptions = {};

var crypto = require("crypto");
const webpush = require("web-push");

// web-push key pairs from firebase webapp
const vapidKeys = {
  publicKey: 'BOLvA0kPE-nu6HdX8Q9K0KVg6sYY0rETWOamQ2nipfuE0ftRTt26Uskuy-ktKquoEv7mrPzUBbfF4wKzbXJYFjo',
  privateKey: 'WO53qkyZguPlS6WufuE_ai1AW2Z8vxK_MPo19zYMYqI'
}

webpush.setVapidDetails("mailto:nutritionplusappvancouver@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey);

const createHash = (input) => {
  const md5sum = crypto.createHash("md5");
  md5sum.update(Buffer.from(input));
  return md5sum.digest("hex");
}

// subscription of push notification
const handlePushNotificationSubscription = (req, res) => {
  const subscriptionRequest = req.body;
  const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
  subscriptions[susbscriptionId] = subscriptionRequest;

  console.log("sendPushNotification", subscriptions)
  
  res.status(201).json({ id: susbscriptionId });
}

// sending push notification - edit payload here
const sendPushNotification = (req, res) => {
  const subscriptionId = req.params.id;
  
  console.log("sendPushNotification", subscriptionId)
  
  const pushSubscription = subscriptions[subscriptionId];
  webpush
    .sendNotification(
      pushSubscription,
      JSON.stringify({
        title: "Time to eat meal",
        text: "It's time to eat meal!",
        image: "/images/favicon2.png",
        actions: null,
        url: "/mymeals"
      })
    )
    .catch(err => {
      console.log(err);
    });

  res.status(202).json({});
}

module.exports = { handlePushNotificationSubscription, sendPushNotification };
