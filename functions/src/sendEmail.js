const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

function sendEmail(authEmail, password, sendTo) {
    const mailTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: authEmail,
            pass: password
        }
    });

    const mailOptions = {
        from: ' "Me" <noreply@firebase.com>',
        to: sendTo,
    };

    mailOptions.subject = 'Thanks for being with us!';
    mailOptions.text = 'You are awesome!';

    return mailTransport.sendMail(mailOptions);
};

module.exports = functions.pubsub.schedule('0 * * * *').onRun( async() => {
        const sendTo = 'd.kurtskhalia@sangu.edu.ge'
        await sendEmail(gmailEmail, gmailPassword, sendTo);
    });