const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);
const sendGenericEmail = ({ to, subject, text }) => {
  sgMail.send({
    from: 'motiphone2003@gmail.com',
    to,
    text,
    email,
  });
};

module.exports = { sendGenericEmail };
