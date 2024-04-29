import express from 'express';
import fs from 'fs';
import path from 'path';
import os from 'os';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Photo } from '../models/photosModel.js';

dotenv.config();

const router = express.Router();

const saveImage = async (imageData) => {
  try {
    const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, '');
    const timestamp = Date.now();
    const desktopPath = path.join(os.homedir(), 'Desktop');
    const imagePath = path.join(desktopPath, 'PhotoBoothPhotos', `photo-${timestamp}.jpeg`);

    if (!fs.existsSync(path.join(desktopPath, 'PhotoBoothPhotos'))) {
      fs.mkdirSync(path.join(desktopPath, 'PhotoBoothPhotos'), { recursive: true });
    }

    fs.writeFileSync(imagePath, base64Data, 'base64');

    // Decode base64 image string
    const buffer = Buffer.from(base64Data, 'base64');

    // Save to database
    const newPhoto = {
      image: buffer,
    };

    const photo = await Photo.create(newPhoto);

    return { imagePath, photo };
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

// Middleware to get today's start and end time
const getTodayStartEnd = () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0); // Set to the beginning of the day
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999); // Set to the end of the day
  return { todayStart, todayEnd };
};

// Fetch photos captured within the day
router.get('/user-gallery', async (req, res) => {
  try {
    const { todayStart, todayEnd } = getTodayStartEnd();

    const photos = await Photo.find({
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });

    const formattedPhotos = photos.map((photo) => ({
      _id: photo._id,
      image: photo.image.toString('base64'),
      createdAt: photo.createdAt,
    }));

    res.status(200).json(formattedPhotos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

// Fetch all photos
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find({});
    const formattedPhotos = photos.map((photo) => ({
      _id: photo._id,
      image: photo.image.toString('base64'),
      createdAt: photo.createdAt,
    }));
    res.status(200).json(formattedPhotos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

//Route for getting a photo by id
router.get('/:id', async (request, response) => {
  try {
      const { id } = request.params;
      const photo = await Photo.findById(id);

      return response.status(200).json(photo);
  } catch (error){
      console.log(error.message);
      response.status(500).send({ message: error.message });
  }
});

router.post('/send-email', async (req, res) => {
  const { to, subject, text, imagePath } = req.body;

  try {
    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
      tls: {
        rejectUnauthorized: false
      }
      
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      attachments: [
        {
          path: imagePath
        }
      ]
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Route for getting multiple photos by IDs
router.post('/multiple', async (req, res) => {
  try {
    const { ids } = req.body;

    // Fetch photos from the database based on the provided IDs
    const photos = await Photo.find({ _id: { $in: ids } });

    // Format the response to include only necessary data
    const formattedPhotos = photos.map((photo) => ({
      _id: photo._id,
      image: photo.image.toString('base64'),
      createdAt: photo.createdAt,
    }));

    res.status(200).json(formattedPhotos);
  } catch (error) {
    console.error('Error fetching multiple photos:', error);
    res.status(500).json({ error: 'Failed to fetch multiple photos' });
  }
});

// Route for emailing multiple photos
router.post('/send-email-multiple', async (req, res) => {
  const { to, subject, text, images } = req.body;

  try {
    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Prepare attachments array from the images data
    const attachments = images.map(image => ({
      filename: `photo_${image._id}.jpeg`, // Assuming JPEG format
      content: image.image, // Base64-encoded image data
      encoding: 'base64' // Specify encoding
    }));

    // Define email options with attachments
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      attachments
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email with multiple photos:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Route for saving new photobooth photos
router.post('/', async (request, response) => {
  try {
      if (!request.body.image) {
          return response.status(400).send({
              message: 'Send all required fields: image',
          });
      }

      // Decode base64 image string
      const base64Image = request.body.image;
      const buffer = Buffer.from(base64Image, 'base64');

      const newPhoto = {
          image: buffer,
      };

      const photo = await Photo.create(newPhoto);

      return response.status(201).send(photo);
  } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
  }
});

// Delete multiple photos by IDs
router.delete('/delete-multiple', async (req, res) => {
  try {
    const { ids } = req.body;

    // Check if IDs array is provided
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty IDs array' });
    }

    // Delete photos from the database based on the provided IDs
    await Photo.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: 'Selected items deleted successfully' });
  } catch (error) {
    console.error('Error deleting photos:', error);
    res.status(500).json({ error: 'Failed to delete photos' });
  }
});


export default router;
