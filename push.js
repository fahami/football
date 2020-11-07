var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BHGC-JJ3nsXnhH2IvwCPmgkVQqz4vv_U29h2scKfI7YlC5kzcRB0MFKr5djlbD12gxsdMKakivOdBNPDfhHV0rs",
    "privateKey": "1Fm8oM9QFyh3KgM49z6XdA2a9pp1JXcvV259DSHab6M"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fuponNE5raA:APA91bFY-eFWZ8uJk54Q8oqSNnVy7TBhBnwliMy1r3UssG10jf8T-uSGjAvP9I0aJRL_EZ90w6bzawEHATcPmB_fVVDEzpPLuIK5XmoMT5HJkOPWgWgXDyTlTsDqXgqo4iE1iCEjskoh",
    "keys": {
        "p256dh": "BI9kX4h3uQlof6Y87ElsWltR4zbD4cRYM3Aedf9Z8aS2JeyPew5ww4SBdk8WvYVx3Xwjgg6GJiA1EEe+oGt94Es=",
        "auth": "MPHdYUGcdz5C7F2xz0VU+w=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '124693896473',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);