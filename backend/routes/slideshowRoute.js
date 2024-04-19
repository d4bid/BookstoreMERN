import express from 'express';
import { Slideshow } from '../models/slideshowModel.js';

const router = express.Router();

// Route for saving new image for slideshow
router.post('/', async (request, response) => {
    try {
        if (!request.body.images || !Array.isArray(request.body.images)) {
            return response.status(400).send({
                message: 'Send all required fields: images',
            });
        }

        // Decode base64 image strings
        const images = request.body.images.map(base64Image => Buffer.from(base64Image, 'base64'));

        const newSlideshows = images.map(image => ({
            image: image,
        }));

        const slideshows = await Slideshow.insertMany(newSlideshows);

        return response.status(201).send(slideshows);
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

// Route for getting all the active slideshow images
router.get('/active', async (request, response) => {
    try {
        const slideshows = await Slideshow.find({ isActive: true });

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

        if (!slideshow) {
            return response.status(404).json({ message: 'Image not found' });
        }

        return response.status(200).json({
            ...slideshow._doc,
            image: slideshow.image.toString('base64')
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating the isActive status of a slideshow image by id
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { isActive } = request.body;

        const slideshow = await Slideshow.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!slideshow) {
            return response.status(404).json({ message: 'Image not found' });
        }

        return response.status(200).json({
            ...slideshow._doc,
            image: slideshow.image.toString('base64')
        });
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

export default router;
