import express from 'express';
import { Slideshow } from '../models/slideshowModel.js';

const router = express.Router();

// Route for saving new image for slideshow
router.post('/', async (request, response) => {
    try {
        if (!request.body.name || !request.body.image) {
            return response.status(400).send({
                message: 'Send all required fields: name, image',
            });
        }

        // Decode base64 image string
        const base64Image = request.body.image;
        const buffer = Buffer.from(base64Image, 'base64');

        const newSlideshow = {
            name: request.body.name,
            image: buffer,
        };

        const slideshow = await Slideshow.create(newSlideshow);

        return response.status(201).send(slideshow);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting all the slideshow images
router.get('/', async (request, response) => {
    try {
        const slideshows = await Slideshow.find({});

        // Convert buffer to base64
        const imagesWithBase64 = slideshows.map(slideshow => ({
            ...slideshow._doc,
            image: slideshow.image.toString('base64')
        }));

        return response.status(200).json({
            count: imagesWithBase64.length,
            data: imagesWithBase64
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting a slideshow image by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const slideshow = await Slideshow.findById(id);

        return response.status(200).json(slideshow);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for deleting a slideshow image
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Slideshow.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Image not found' });
        }

        return response.status(200).send({ message: 'Image deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router