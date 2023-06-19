const express = require('express');
const dotenv = require('dotenv').config();
const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_FOR_NODEMAILER,
        pass: process.env.PASSWORD_FOR_NODEMAILER,
    },
});

module.exports.subscriber = async (req, res) => {

    try {
        const email = req.body.email;
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
        transporter.sendMail(customerMailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        res.send("hello")

    } catch (error) {
        console.log(error)
    }
}