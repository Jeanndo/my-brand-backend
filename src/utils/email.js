// @ts-nocheck
import nodemailer from "nodemailer"

const sendEmail = async (options) => {
  // create transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // ACTIVATE LESS SECURE OPTION IN GMAIL
  })
  // define email options
  const emailOption = {
    from: "codemoon <ukjeando@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  }
  //  send email with nodemailer
  await transporter.sendMail(emailOption)
}

export default sendEmail
