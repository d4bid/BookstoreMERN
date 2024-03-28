import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

// Construct the absolute path to myCredentials.json
const credentialsPath = path.join(__dirname, 'utils', 'cred.json');

let credentials;
try {
  credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
} catch (error) {
  console.error('Error reading credentials file:', error);
  throw new Error('Failed to read credentials file');
}

if (!credentials.web || !credentials.web.client_id || !credentials.web.client_secret || !credentials.web.redirect_uris || credentials.web.redirect_uris.length === 0) {
  throw new Error('Invalid credentials file structure');
}

const oauth2Client = new OAuth2Client(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

oauth2Client.setCredentials({
  refresh_token: credentials.web.refresh_token
});

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'dcabrito04@gmail.com',
    clientId: credentials.web.client_id,
    clientSecret: credentials.web.client_secret,
    refreshToken: credentials.web.refresh_token,
    accessToken: accessToken
  }
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'dcabrito04@gmail.com',
    to,
    subject,
    text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true };
  } catch (error) {
    console.log('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
};

export { sendEmail };
