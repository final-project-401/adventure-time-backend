'use strict';

require('dotenv').config({ path: '../../../.env'});
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(req, res, next) {

  const { receiver, sender, cc, text } = req.query;

  const msg = {
    to: receiver,
    from: sender,
    subject: 'You have been invited to an event',
    text,
    html: text,
  };

  if (cc) {
    const ccRecipients = cc.split(',').map((email) => email.trim());
    msg.cc = ccRecipients;
  }

  sgMail
    .send(msg)
    .then(() => {
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
  sendEmail,
};
