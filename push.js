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
    "endpoint": "https://fcm.googleapis.com/fcm/send/dZtT9-cSXaE:APA91bEvbbHycKG6ovzUkw7SftAx2xIHBfogXy5k_hnWM-9rxGHonjpLdvhtMQLxOWNo2ql6mQhFXOytGLinFy6yIl-ihLa_EL-9KAYjO86OMzZCnEM6SQDJs044JzNAUhgelrm44UL8",
    "keys": {
        "p256dh": "BLywNVQS6tbe2mkkvSjxoDczlvkPL6X+zmJ1ugusQ59IC+Tvjze3W3388LpEVMCt9YMPDTThTiAm0hOfuAKaY4A=",
        "auth": "nHT4xR/vl1Glsy2yTzbm7w=="
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