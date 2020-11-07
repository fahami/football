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
    "endpoint": "https://fcm.googleapis.com/fcm/send/fG59VyyqKss:APA91bHADzBB2AURGk9s4Ijor1NqolIHAxiqREggtUJME2eJ5LnSF3q0acfq1V4QCeHicfgLloa46q6lQHhActQVLmA2uefRCAdCu00eRmh3nn38754wwWrH_mozSXBDyn_JC1tLCQ2R",
    "keys": {
        "p256dh": "BAn1R92SIqefQLszVJKUkWbwD3CVQ3Hlcu5vAG/SCntaujgObpKV5cB6Vf9HPQCceGEteTo5RoAizyvRz4P1jLY=",
        "auth": "dlt8DId/fJZ11b1M5UmC4g=="
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