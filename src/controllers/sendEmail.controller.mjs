import nodemailer from "nodemailer"

class SendEmailController {

 static transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rachealdev256@gmail.com',
        pass: 'cegi xatw kjfv weyf'
    }
});

static sendEmail = (emailRecipient,tenantName,userId) => {
    const resetURL = `http://127.0.0.1:${process.env.PORT}/login/setPassword/${userId}`;// TODO-add a token here (what happens when the toke expires??)
    const mailOptions = {
        from: 'rachealdev256@gmail.com',
        to: emailRecipient,
        subject: 'NyumbaYo - Set an Account password',
        html: `Dear  ${tenantName}  Use the link below to set a password for your account in the NyumbaYo App .<br> <a href="${resetURL}">Set Password</a>`
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