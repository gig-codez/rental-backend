import nodemailer from "nodemailer";
import "dotenv/config";
import SendMail from "../helpers/SendMail.mjs";

class ForgotPassword {
  static forgotPassword = async (req, res) => {
    try {
      let options = {
        from: '"Mugamba Bruno 👻" <brunohectre@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Reset password request ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>",
      };
      //  send mail
      SendMail.sendMail(options, res);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}
export default ForgotPassword;
