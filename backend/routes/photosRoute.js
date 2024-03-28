import express from 'express';
import fs from 'fs';
import path from 'path';
import os from 'os';
import nodemailer from 'nodemailer';
import { sendEmail } from '../utils/sendEmail.js';

const router = express.Router();

const saveImage = (imageData) => {
  try {
    const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, '');
    const timestamp = Date.now();
    //const desktopPath = 'C:\\Users\\Richel\\Desktop';
    const desktopPath = path.join(os.homedir(), 'Desktop');
    const imagePath = path.join(desktopPath, 'PhotoBoothPhotos', `photo-${timestamp}.jpeg`);

    if (!fs.existsSync(path.join(desktopPath, 'PhotoBoothPhotos'))) {
      fs.mkdirSync(path.join(desktopPath, 'PhotoBoothPhotos'), { recursive: true });
    }

    fs.writeFileSync(imagePath, base64Data, 'base64');

    return imagePath;
  } catch (error) {
    console.error('Error saving image:', error);
    throw new Error('Failed to save image');
  }
};

router.post('/save-image', (req, res) => {
  const { imageData } = req.body;

  try {
    const imagePath = saveImage(imageData);
    res.status(200).json({ imagePath });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// New endpoint to send email
router.post('/send-email', async (req, res) => {
  const { to, subject, text, imagePath } = req.body;

  try {
    const result = await sendEmail(to, subject, text);  // Use sendEmail function
    if (result.success) {
      res.status(200).json({ message: 'Email sent successfully' });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
