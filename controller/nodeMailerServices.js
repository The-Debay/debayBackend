const handlebars = require('handlebars');
const path = require("path")
const fs = require('fs')
const { EMAIL_SUCCESS, EMAIL_FAIL } = require("../utils/constantMessage");
const nodemailer = require("nodemailer");
//let aws = require("@aws-sdk/client-ses");
// let { defaultProvider } = require("@aws-sdk/credential-provider-node");
// const ses = new aws.SES({
//   apiVersion: "2010-12-01",
//   region: "ap-south-1",
//   defaultProvider,
// });
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey:process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});
const sendMails = async ({ adminData, subject = " Welcome to Our Internal Admin Team - Onboarding Information Inside", token } = {}) => {
  let tokenUrl = `http://128.199.26.61:3000/admin/join/${token}` //TODO: take website url from .env
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, '/htmlTemplates/AdminInvitation.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    ...adminData, token, tokenUrl
  };
  const htmlToSend = template(replacements);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  let mailOptions = {
    from: process.env.SMTP_USER,
    to: adminData.email,
    subject: subject,
    html: htmlToSend
  };
  console.log("Test 1");
  return new Promise((resolve, reject) => {
    try {
      transporter.sendMail(mailOptions, function (error, info) {
        console.log(error, "error")
        if (error) {
          console.log(error)
          reject({ msg: "erorr while sending mail please try it again" });
        } else {
          resolve({ msg: `mail sent successfully in to ${adminData.email}` });
        }
      });
    } catch (error) {
      console.log(error, "error")

    }

  });
};

const send_mailOld = async (fromEmail, name, subject, msg) => {
  let transporter = nodemailer.createTransport({
    SES: { ses, aws },
  });
  return new Promise((resolve, reject) => {
    try {
      transporter.sendMail(
        {
          from: process.env.EMAIL_FROM,
          to: fromEmail,
          subject: subject,
          text: msg,
          ses: {
            // optional extra arguments for SendRawEmail
            // Tags: [
            //   {
            //     Name: "tag_name",
            //     Value: "tag_value",
            //   },
            // ],
          },
        },
        (err, info) => {
          if (err) {
            console.log(err)
            reject({ msg: EMAIL_FAIL });
          } else {
            resolve({ msg: EMAIL_SUCCESS + ` ${process.env.EMAIL_FROM}` });
          }
        }
      );

    } catch (error) {
      console.log(error, "error")

    }

  });
};
const send_mail = async (fromEmail, name, subject, msg) => {
  const transporter = nodemailer.createTransport({
    SES: new AWS.SES({ apiVersion: '2010-12-01' })
  });
  return new Promise((resolve, reject) => {
    try {
      let text =  `Name: ${name}\nEmail: ${fromEmail}\nMessage: ${msg}`;
      const mailOptions = {
        from: process.env.EMAIL_TO,
        to: process.env.EMAIL_FROM,
        subject: subject,
        text: text
      };

      transporter.sendMail(mailOptions, (error, info) => {
    
        if (error) {
          console.log(error)
          reject({ msg: EMAIL_FAIL });
        } else {
          resolve({ msg: EMAIL_SUCCESS + ` ${process.env.EMAIL_FROM}` });
        }
      }
      );

    } catch (error) {
      console.log(error, "error")

    }

  });
};
const send_mail_template = async ({ adminData,token,subject } = {}) => {
  let tokenUrl = `http://128.199.26.61:3000/resetpassword/?${token}` //TODO: take website url from .env
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, '/htmlTemplates/ForgotPassword.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    ...adminData, token, tokenUrl
  };
  const htmlToSend = template(replacements);
  const transporter = nodemailer.createTransport({
    SES: new AWS.SES({ apiVersion: '2010-12-01' })
  });
  return new Promise((resolve, reject) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_TO,
        to: adminData.email,
        subject: subject,
        html: htmlToSend
      };

      transporter.sendMail(mailOptions, (error, info) => {
    
        if (error) {
          console.log(error)
          reject({ msg: EMAIL_FAIL });
        } else {
          resolve({ msg: EMAIL_SUCCESS + ` ${process.env.EMAIL_FROM}` });
        }
      }
      );

    } catch (error) {
      console.log(error, "error")

    }

  });
};
module.exports = {
  sendMails, send_mail,send_mail_template
}