import nodemailer from "nodemailer";
class SendMail{
    static sendMail = async (options,res) => {
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

      transporter.sendMail(options, (error, info) => {
        if (error) {
          res.status(400).json({ error });
        } else {
          res.status(200).json({ message: info.response });
        }
      });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
export default SendMail;