import nodemailer from "nodemailer"

class SendEmailController {

 static transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rachealdev256@gmail.com',
        pass: 'cegi xatw kjfv weyf'
    }
});

static sendEmail = (emailRecipient,tenantName) => {
    const mailOptions = {
        from: 'rachealdev256@gmail.com',
        to: emailRecipient,
        subject: 'Set an Account password',
        text: 'Dear ' + tenantName + ' Use the link below to set a password for your account in the NyumbaYo App .'
    };

    SendEmailController.transporter.sendMail(mailOptions, (error, info) =>{
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
}

export default SendEmailController;