const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

async function vendorBookingNotification ({customerData, bookedService, seriveProvider}) {
   
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
        to: seriveProvider.email,
        subject: `${bookedService.name} Service Booking Confirmation`,
        html: `<div><h4>Hello ${seriveProvider.firstName}, Please check the booking details below:</p>
        <ul>
            <li>Service: <strong>${bookedService.name}</strong></li>
            <li>Service Provider Email: <strong>${seriveProvider.email}</strong></li>
            <li>Service Cost: <strong>${bookedService.cost} / per hour</strong></li>
            <li>Date & Time: <strong>${bookedService.dateTime}</strong></li>
            <li>Service Booked By: <strong>${customerData.firstName} ${customerData.lastName}</strong></li>
            <li>Contact Email: <strong>${customerData.email}</strong></li>
        </ul>
        </div>`
    };
    
    await new Promise((resolve, reject) => {
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err.message);
                reject(err);
            } else {
                console.log(`Vendor's Booking Confirmation email sent successfully to ${seriveProvider.email}`);
                resolve(data);
            }
        });
    });
}

module.exports = vendorBookingNotification