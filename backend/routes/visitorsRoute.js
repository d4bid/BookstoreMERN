import express from 'express';
import { Visitor } from '../models/visitorModel.js';

const router = express.Router();

// Route for saving new visitor
router.post('/', async (request, response) => {
    try {
        const newVisitor = {
            sessionID: request.body.sessionID,
            name: request.body.name,
            organization: request.body.organization,
            email: request.body.email,
        };

        const visitor = await Visitor.create(newVisitor);

        return response.status(201).send(visitor);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting the latest visitor with a specific session ID
router.get('/latest/:sessionID', async (request, response) => {
    try {
        const { sessionID } = request.params;
        const latestVisitor = await Visitor.findOne({ sessionID }).sort({ createdAt: -1 });

        if (!latestVisitor) {
            return response.status(404).json({ message: 'No visitors found for the provided session ID' });
        }

        return response.status(200).json(latestVisitor);
    } catch (error) {
        console.log('No visitors found for the provided session ID' );
        // console.log(error.message);
        // response.status(500).send({ message: error.message });
    }
});

// Route for getting the latest visitor log
router.get('/latest', async (request, response) => {
    try {
        const latestVisitor = await Visitor.findOne({}).sort({ createdAt: -1 });

        if (!latestVisitor) {
            return response.status(404).json({ message: 'No visitors found' });
        }

        return response.status(200).json(latestVisitor);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting all the visitors
router.get('/', async (request, response) => {
    try {
        const visitors = await Visitor.find({});

        return response.status(200).json({
            count: visitors.length,
            data: visitors,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting a visitor by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const visitor = await Visitor.findById(id);

        if (!visitor) {
            return response.status(404).json({ message: 'Visitor not found' });
        }

        return response.status(200).json(visitor);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
