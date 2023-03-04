const nodemailer = require('nodemailer');

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yasirarafat0421@gmail.com',
            pass: 'gxqnwyzsnpjvciiw',
        },
    });

    const mailOptions = {
        from: 'yasirarafat0421@gmail.com',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText,
    };
    return await transporter.sendMail(mailOptions);
};
module.exports = SendEmailUtility;
