const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.sparkpostmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'SMTP_Injection',
    pass: process.env.SPARKPOST_API_KEY
  }
});

const domain = process.env.FRONTEND_HOST || 'localhost:3000';
exports.sendPasswordResetEmail = (toEmail, token) => {
  const mailOptions = {
    from: 'Digital Empowerment <accounts@digital-empowerment.be>',
    to: toEmail,
    subject: 'Reset your password',
    text: `
      You're receiving this email because you submitted a request to reset your password for the Digital Empowerment platform.

      Set your new password here: http://${domain}/reset-password/${token}

      If you did not submit this password reset request, you can safely ignore this e-mail.
    `
  };

  return transporter.sendMail(mailOptions);
};

exports.sendInvitationEmail = (toEmail, token) => {
  const mailOptions = {
    from: 'Digital Empowerment <accounts@digital-empowerment.be>',
    to: toEmail,
    subject: 'You\ve been invited to manage Digital Empowerment',
    text: `
      You've been invited to manage the Digital Empowerment platform.

      Accept the invitation by setting your account password via this link: http://${domain}/reset-password/${token}
    `
  };
  return transporter.sendMail(mailOptions);
};
