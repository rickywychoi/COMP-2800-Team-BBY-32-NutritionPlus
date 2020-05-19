const receivePushNotification = (event) => {
  console.log("[Service Worker] Push Received.");

  const { image, tag, url, title, text } = event.data.json();

  const options = {
    data: url,
    body: text,
    icon: image,
    // tag: tag,
    // image: image
  };
  event.waitUntil(self.registration.showNotification(title, options));
}

const openPushNotification = (event) => {
  console.log("[Service Worker] Notification click Received.", event.notification.data);
  
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
}

if (typeof self !== "undefined") {
  self.addEventListener("push", receivePushNotification);
  self.addEventListener("notificationclick", openPushNotification);
}