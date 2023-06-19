const nodemailer = require("nodemailer");
// const User = require("../model/userSchema");
const path = require("path");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_FOR_NODEMAILER,
        pass: process.env.PASSWORD_FOR_NODEMAILER,
    },
});

const mailForSubscription = async (email) => {
    let mailOptions = {
        from: process.env.EMAIL_FOR_NODEMAILER,
        subject: "Subscription Request",
        to: process.env.TO_EMAIL,
        // template: "subscription", to do later for betterment
        html: `<p> Hi, ${email} has requested to Subscribe Benz Packaging. </p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
    let customerMailOptions = {
        from: process.env.EMAIL_FOR_NODEMAILER,
        subject: "Subscribed for Benz Packaging",
        to: email,
        // template: "subscription", to do later for betterment
        html: `<p> Hi, <br> This mail is to inform you that you have subscribed to Benz Packaging Successfully. </p>`,

    }
}