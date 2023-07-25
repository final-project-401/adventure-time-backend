'use strict';

require('dotenv').config({ path: '../../../.env'});
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

console.log(process.env.SENDGRID_API_KEY);

function sendEmail(req, res, next) {

  const msg = {
    to: 'donnaada@icloud.com',
    from: 'itsjoshcoffey@gmail.com',
    subject: 'You have been invited to an event',
    text: ' ',
    html: '<link></link>',
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
