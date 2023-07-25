
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(req, res, next) {

  const msg = {
    to: 'donnaada@icloud.com',
    from: 'itsjoshcoffey@gmail.com',
    subject: 'You have been invited to an event',
    text: req.query.text,
    html: '<strong>There has been an update to the schedule</strong>',
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent', msg);
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
  sendEmail,
};
