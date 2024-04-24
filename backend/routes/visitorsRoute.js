import express from 'express';
import { Visitor } from '../models/visitorModel.js';

const router = express.Router();

// Route for saving new visitor
router.post('/', async (request, response) => {
    try {
        if (!request.body.name || !request.body.organization || !request.body.email) {
            return response.status(400).send({
                message: 'Send all required fields: name, organization, email',
            });
        }

        const newVisitor = {
            name: request.body.name,
            organization: request.body.organization,
            address: request.body.address,
            contact: request.body.contact,
            email: request.body.email,
        };

        const visitor = await Visitor.create(newVisitor);

        return response.status(201).send(visitor);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
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
