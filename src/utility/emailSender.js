require('dotenv').config();
const nodemailer = require('nodemailer');
const ejs = require('ejs');

async function sendTicketsEmail(recipientEmail, attachment) {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const templatePath = 'src/static/emailTemplates/bookingEmailTemplate.ejs';
  const emailContent = await ejs.renderFile(templatePath);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: recipientEmail,
    subject: process.env.EMAIL_SUBJECT,
    html: emailContent,
    attachments: [
      {
        filename: process.env.EMAIL_ATTACHMENT_NAME,
        content: attachment,
        encoding: 'base64',
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = { sendTicketsEmail };