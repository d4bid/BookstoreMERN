import express from 'express';
import { Frame } from '../models/frameModel.js';

const router = express.Router();

// Route for saving new frames
router.post('/', async (request, response) => {
    try {
        if (!request.body.name || !request.body.image) {
            return response.status(400).send({
                message: 'Send all required fields: name, image',
            });
        }
        const newFrame = {
            name: request.body.name,
            image: request.body.image,
        };

        const frame = await Frame.create(newFrame);

        return response.status(201).send(frame);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting all the frames
router.get('/', async (request, response) => {
    try {
        const frames = await Frame.find({});

        return response.status(200).json({
            count: frames.length,
            data: frames
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting a frame by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const frame = await Frame.findById(id);

        return response.status(200).json(frame);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a frame
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.name || !request.body.image) {
            return response.status(400).send({
                message: 'Send all required fields: name, image',
            });
        }

        const { id } = request.params;

        const result = await Frame.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Frame not found' });
        }

        return response.status(200).send({ message: 'Frame updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for deleting a frame
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Frame.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Frame not found' });
        }

        return response.status(200).send({ message: 'Frame deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
