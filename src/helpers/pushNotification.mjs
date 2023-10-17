// import serviceAccount from "./config.json";
import admin from "firebase-admin";
import fcm from "fcm-notification";
import "dotenv/config"
const serviceAccount = {
    "type": "service_account",
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pwxsu%40notify-a7382.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};
class PushNotification {
    static async sendNotification(req, res) {
        const FCM = new fcm(cert);
        let cert = admin.credential.cert(serviceAccount);
    let msg = {
      data: {
        title: req.body.title,
        body: req.body.body,
      },
      token: req.params.token,
    };
    FCM.send(msg, (err, response) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.status(200).send({ message: "Notification sent successfully" });
        return;
      }
    });
  }
}
export default PushNotification;
