const express = require("express");
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");
const Subscription = require("../model/subscriptions");
const { body, validationResult } = require("express-validator");
const Message = require("../model/messages");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FOR_NODEMAILER,
    pass: process.env.PASSWORD_FOR_NODEMAILER,
  },
});

module.exports.subscriber = [
  body("name").not().isEmpty().withMessage("Body Field is required"),
  body("email").not().isEmpty().withMessage("Email Field is required"),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      const { name, email } = req.body;
      let mailOptions = {
        from: process.env.EMAIL_FOR_NODEMAILER,
        subject: "Subscription Request",
        to: process.env.TO_EMAIL,
        // template: "subscription", to do later for betterment
        html: `<p> Hi, ${email} has requested to Subscribe Benz Packaging. </p>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(400).json({ error: "error while sending mail" });
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
      };
      transporter.sendMail(customerMailOptions, function (error, info) {
        if (error) {
          res.status(400).json({ error: "error while sending mail" });
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      const subsciber = new Subscription({
        name,
        email,
      });
      await subsciber.save();
      res.status(200).json({ message: "successful", subsciber });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
];

module.exports.message = [
  body("name").not().isEmpty().withMessage("Name Field is required"),
  body("email").not().isEmpty().withMessage("Email Field is required"),
  body("phone").not().isEmpty().withMessage("Phone Field is required"),
  body("message").not().isEmpty().withMessage("Message Field is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    try {
      const { name, email, phone, message } = req.body;
      let mailOptions = {
        from: process.env.EMAIL_FOR_NODEMAILER,
        subject: "Message Request",
        to: process.env.TO_EMAIL,
        // template: "subscription", to do later for betterment
        html: `<p> Hi, ${email} has requested to Contact Benz Packaging. </p>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(400).json({ error: "error while sending mail" });
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      const user = new Message({
        name,
        email,
        phone,
        message,
      });
      await user.save();
      res.status(200).json({ message: "Successfull", user });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
];
