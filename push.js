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
    "endpoint": "https://fcm.googleapis.com/fcm/send/ey8ro8xe__g:APA91bHEFaopvG0QXMHC-n5jveNxzD_rizami4mI7anNnGBLb_FN5wEmWWqSzOod2qxw4Kp__b7tDIkwkm2IVl4es7-NicdiloWPbRFI0ArQW8cm_B8hiJXvme9PIcVhMr6j3NtTj4YM",
    "keys": {
        "p256dh": "BM0G1HihzfVMegMamefDStwl53NgWKizXPoyqtKQMJUvP7JTgkI6lmZHfrGIAEy3izKhRmMbbwR5bGC/B525jL0=",
        "auth": "16Hj1A4MqM6WMDAhiXBa0A=="
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