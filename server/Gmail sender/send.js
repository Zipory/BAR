import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.GMAIL_ADDRESS, // your email
    pass: process.env.GMAIL_PASSWORD, // your password
  },
});
// const mailOptions = {
//   from: process.env.GMAIL_ADDRESS, // your email
//   to: "beni0548472300@gmail.com", // recipient's email
//   subject: "Hello ✔", // Subject line
//   text: "Hello world?", // plain text body
//   html: "<h6>this is the project mailer.<br>are you excited?!</h6>", // html body
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

export function sendMail(email, subject, isText, message) {
  const mailOptions = {
    from: process.env.GMAIL_ADDRESS,
    to: email,
    subject: subject,
    [isText ? "text" : "html"]: message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
