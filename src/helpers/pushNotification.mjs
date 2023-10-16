import serviceAccount from "./config.json";
import admin from "firebase-admin";

let cert = admin.credential.cert(serviceAccount);
import fcm from 'fcm-notification';
const FCM = new fcm(cert)

class PushNotification {
static sendNotification (req, res, next) {
    
    let msg = {
        data: {
            title: "Mukwano Toffa",
            body: "Just go get your kid before time is up"
        },
        token: req.params.token
    };
    FCM.send(msg, (err, response) => {
        if (err) {
            res.status(500).send({ "message": err });
            return;
        } else {
            res.status(200).send({ message: "Notification sent successfully" });
            return;
        }
    });
}
}
export default PushNotification;