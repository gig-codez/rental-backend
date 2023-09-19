import nodemailer from "nodemailer";
import "dotenv/config";

class ForgotPassword {
  static forgotPassword = async (req, res) => {
    try {
      // first check if a landlord with the same name exists
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      let options = {
        from: '"Mugamba Bruno 👻" <brunohectre@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Reset password request ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>",
      };
      //  send mail
      transporter.sendMail(options, (error, info) => {
        if (error) {
          res.status(400).json({ error });
        } else {
          res.status(200).json({ message: info.response });
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}
export default ForgotPassword;
