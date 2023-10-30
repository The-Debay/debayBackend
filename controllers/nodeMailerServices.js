const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");
const { EMAIL_SUCCESS, EMAIL_FAIL } = require("../utils/constantMessage");
const nodemailer = require("nodemailer");

const sendMails = async ({customerName, otp, email, subject = "Otp for Verification"}={}) => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, "/htmlTemplate/emailOtp.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = {
    customerName,
    otp,
  };
  const htmlToSend = template(replacements);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  let mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: subject,
    html: htmlToSend,
  };
  return new Promise((resolve, reject) => {
    try {
      transporter.sendMail(mailOptions, function (error, info) {
        console.log(error, "error");
        if (error) {
          console.log(error);
          reject({ msg: "erorr while sending mail please try it again" });
        } else {
          resolve({ msg: `mail sent successfully in to ${adminData.email}` });
        }
      });
    } catch (error) {
      console.log(error, "error");
    }
  });
};


module.exports = {
  sendMails
}