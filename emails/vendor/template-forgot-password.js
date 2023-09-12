const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

async function vendorEmailForgotPassword(userData) {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    await new Promise((resolve, reject) => {
        mailTransporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    let mailDetails = {
        from: process.env.GMAIL_ID,
        to: userData.email,
        subject: 'Reset Password',
        html: `<h4>Hello, Please click the below link for reset your password</h4><p><a target="_blank" href="${process.env.SITE_URL}/reset-password/vendor/${userData.id}/${userData.token}">${process.env.SITE_URL}/reset-password/vendor/${userData.id}/${userData.token}</a></p>`
    };
    await new Promise((resolve, reject) => {
        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log(err.message);
                reject(err);
            } else {
                console.log(`Password reset email sent successfully to ${userData.email}`);
                resolve(data);
            }
        });
    });
}

module.exports = vendorEmailForgotPassword