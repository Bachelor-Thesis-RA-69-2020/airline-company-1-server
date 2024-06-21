const nodemailer = require('nodemailer');
const ejs = require('ejs');

async function sendTicketsEmail(recipientEmail, attachment) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // secure:false for TLS connection
    auth: {
      user: 'psw2023grupa2@gmail.com',
      pass: 'iqjm gqhi dgvs nyjc', // Replace with your Gmail app password or account password
    },
  });

  const templatePath = 'src/static/emailTemplates/bookingEmailTemplate.ejs';
  const emailContent = await ejs.renderFile(templatePath);

  const mailOptions = {
    from: 'psw2023grupa2@gmail.com',
    to: recipientEmail, // <-- Ensure recipientEmail is passed correctly
    subject: 'Booking Confirmation',
    html: emailContent,
    attachments: [
      {
        filename: 'document.pdf',
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
