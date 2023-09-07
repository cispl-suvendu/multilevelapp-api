const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

function emailForgotPassword (userData) {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASSWORD
        }
    });
    
    let mailDetails = {
        from: process.env.GMAIL_ID,
        to: userData.email,
        subject: 'Reset Password',
        html: `<h4>Hello, Please click the below link for reset your password</h4><p><a target="_blank" href="${process.env.SITE_URL}/reset-password/admin/${userData.token}">${process.env.SITE_URL}/reset-password/admin/${userData.token}</a></p>`
    };
    
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err.message);
        } else {
            console.log(`Password reset email sent successfully to ${userData.email}`);
        }
    });
}

module.exports = emailForgotPassword