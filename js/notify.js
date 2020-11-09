if ("Notification" in window) {
    requestPermission();
} else {
    console.error("Browser tidak mendukung notifikasi.");
}
function requestPermission(){
    Notification.requestPermission().then((result) => {
        if (result === "denied") {
            console.log("Fitur notifikasi tidak diijinkan.");
            return;
        } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin.");
            return;
        }
        console.log("Fitur notifikasi diijinkan.");
    });
};
if ("PushManager" in window) {
    navigator.serviceWorker.getRegistration().then((registration) => {
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BHGC-JJ3nsXnhH2IvwCPmgkVQqz4vv_U29h2scKfI7YlC5kzcRB0MFKr5djlbD12gxsdMKakivOdBNPDfhHV0rs"),
        }).then((subscribe) => {
            console.log("Berhasil melakukan subscribe dengan endpoint: ", subscribe.endpoint);
            console.log("Berhasil melakukan subscribe dengan p256dh key: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("p256dh")))));
            console.log("Berhasil melakukan subscribe dengan auth key: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("auth")))));
        }).catch((e) => {
            console.error("Tidak dapat melakukan subscribe ", e.message);
        });
    });
}
urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};