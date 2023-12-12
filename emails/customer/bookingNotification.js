const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

async function bookingNotification (userData) {
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
        subject: 'Service Booking Confirmation',
        html: `<div><h4>Hello, Please check the booking details below:</p>
        <ul>
            <li>Service: <strong></strong></li>
            <li>Service Provider Email: <strong></strong></li>
            <li>Service Cost: <strong></strong></li>
            <li>Service Cost: <strong></strong></li>
            <li>Date & Time: <strong></strong></li>
            <li>Service Booked By: <strong></strong></li>
            <li>Contact Email: <strong></strong></li>
        </ul>
        </div>`
    };
    
    await new Promise((resolve, reject) => {
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err.message);
                reject(err);
            } else {
                console.log(`Booking Confirmation email sent successfully to ${userData.email}`);
                resolve(data);
            }
        });
    });
}

module.exports = bookingNotification