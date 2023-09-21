const express = require("express");
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");
const { body, validationResult } = require("express-validator");
const Subscription = require("../model/subscriptions");
const OnlyEmail = require("../model/onlyemail");
const Message = require("../model/messages");
const Distributor = require("../model/distributor");
const Resume = require("../model/resume");

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
      } else {
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
          html: `<p>
          Hi, ${name} <br> 
          This mail is to inform you that you have subscribed to Benz Packaging Successfully. </p>`,
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
      }
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
    } else {
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
    }
  }
];

module.exports.subscriber_email = [
  // body("name").not().isEmpty().withMessage("Body Field is required"),
  body("email").not().isEmpty().withMessage("Email Field is required"),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      } else {
        const { email } = req.body;
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
          html: `<p>
          Hi, ${email} <br> 
          This mail is to inform you that you have subscribed to Benz Packaging Successfully. </p>`,
        };
        transporter.sendMail(customerMailOptions, function (error, info) {
          if (error) {
            res.status(400).json({ error: "error while sending mail" });
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        const subsciber = new OnlyEmail({
          email,
        });
        await subsciber.save();
        res.status(200).json({ message: "successfull", subsciber });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
];

module.exports.distributor = [
  body("name").not().isEmpty().withMessage("Name Field is required"),
  body("companyName").not().isEmpty().withMessage("Company Name Field is required"),
  body("address").not().isEmpty().withMessage("address Field is required"),
  body("operatingYears").not().isEmpty().withMessage("operatingYears Field is required"),
  body("investment").not().isEmpty().withMessage("investment Field is required"),
  body("hasVehicle").not().isEmpty().withMessage("hasVehicle Field is required"),
  body("phone").not().isEmpty().withMessage("phone Field is required"),
  body("bankName").not().isEmpty().withMessage("bankName Field is required"),
  body("operatingYearsBank").not().isEmpty().withMessage("operatingYearsBank Field is required"),
  body("area").not().isEmpty().withMessage("area Field is required"),
  body("officerName").not().isEmpty().withMessage("officerName Field is required"),
  body("position").not().isEmpty().withMessage("position Field is required"),
  // body("signature").not().isEmpty().withMessage("signature Field is required"),

  async (req, res) => {
    try {
      console.log('we are in try block')
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      else {
        const {
          name,
          companyName,
          address,
          operatingYears,
          investment,
          hasVehicle,
          phone,
          bankName,
          operatingYearsBank,
          area,
          officerName,
          position,
          // signature,
        } = req.body;

        // Create a new Distributor instance and save it to the database
        const distributor = new Distributor({
          name,
          companyName,
          address,
          operatingYears: Number(operatingYears),
          investment: Number(investment),
          hasVehicle: Boolean(hasVehicle),
          phone: Number(phone),
          bankName,
          operatingYearsBank: Number(operatingYearsBank),
          area,
          officerName,
          position,
          // signature,
        });

        await distributor.save();

        // Send email notification to your personal email address
        let mailOptions = {
          from: process.env.EMAIL_FOR_NODEMAILER,
          subject: 'Distributor Application',
          to: process.env.TO_EMAIL,
          html: `
          <p> Hi,</p>
            <p>A new distributor application has been submitted with the following details:</p>
            <table border="1" cellpadding="5" cellspacing="0">
              <tr>
                <td>Name:</td>
                <td>${name}</td>
              </tr>
              <tr>
                <td>Company Name:</td>
                <td>${companyName}</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>${address}</td>
              </tr>
              <tr>
                <td>Operating Years:</td>
                <td>${operatingYears}</td>
              </tr>
              <tr>
                <td>Investment:</td>
                <td>${investment}</td>
              </tr>
              <tr>
                <td>Has Vehicle:</td>
                <td>${hasVehicle ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td>${phone}</td>
              </tr>
              <tr>
                <td>Name of the Bank:</td>
                <td>${bankName}</td>
              </tr>
              <tr>
                <td>Operating Years (Bank):</td>
                <td>${operatingYearsBank}</td>
              </tr>
              <tr>
                <td>Area:</td>
                <td>${area}</td>
              </tr>
              <tr>
                <td>Name of the Officer:</td>
                <td>${officerName}</td>
              </tr>
              <tr>
                <td>Position:</td>
                <td>${position}</td>
              </tr>
            </table>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        res.status(200).json({ message: 'Successful', distributor });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
];

module.exports.resume = [
  // body("firstName").not().isEmpty().withMessage("Name Field is required"),
  // body("lastName").not().isEmpty().withMessage("Last Name Field is required"),
  // body("phone").not().isEmpty().withMessage("Phone Field is required"),
  // body("address1").not().isEmpty().withMessage("address Field is required"),
  // body("address2").not().isEmpty().withMessage("address Field is required"),

  async (req, res) => {
    try {
      console.log('we are in try block')
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      else {
        const {
          firstName,
          lastName,
          phone,
          address1,
          address2,
        } = req.body;

        // Create a new Distributor instance and save it to the database
        const resume = new Resume({
          firstName,
          lastName,
          phone,
          address1,
          address2,
        });

        await resume.save();

        // Send email notification to your personal email address
        let mailOptions = {
          from: process.env.EMAIL_FOR_NODEMAILER,
          subject: 'Resume Application',
          to: process.env.TO_EMAIL,
          html: `
          <p> Hi,</p>
            <p>A new Resume has been submitted with the following details:</p>
            <table border="1" cellpadding="5" cellspacing="0">
            <tr>
              <td>First Name:</td>
              <td>${firstName}</td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>${lastName}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>${phone}</td>
            </tr>
            <tr>
              <td>Address 1:</td>
              <td>${address1}</td>
            </tr>
            <tr>
              <td>Address 2:</td>
              <td>${address2}</td>
            </tr>
          </table>
        `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        res.status(200).json({ message: 'Successful', resume });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
];