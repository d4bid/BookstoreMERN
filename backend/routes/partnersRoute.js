import express from 'express';
import { Partner } from '../models/partnerModel.js';

const router = express.Router();

// Route for saving new partners
router.post('/', async (request, response) => {
    try {
        if (!request.body.name || !request.body.type) {
            return response.status(400).send({
                message: 'Send all required fields: name, type',
            });
        }

        const newPartner = {
            name: request.body.name,
            type: request.body.type,
            image: request.body.image ? Buffer.from(request.body.image, 'base64') : undefined,
            address: request.body.address,
            contact: request.body.contact,
            email: request.body.email,
            website: request.body.website,
        };

        const partner = await Partner.create(newPartner);

        return response.status(201).send(partner);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting all the partners
router.get('/', async (request, response) => {
    try {
        const partners = await Partner.find({});

        // Convert buffer to base64 for image field
        const partnersWithBase64 = partners.map(partner => ({
            ...partner._doc,
            image: partner.image ? partner.image.toString('base64') : undefined,
        }));

        return response.status(200).json({
            count: partnersWithBase64.length,
            data: partnersWithBase64,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting a partner by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const partner = await Partner.findById(id);

        if (!partner) {
            return response.status(404).json({ message: 'Partner not found' });
        }

        return response.status(200).json(partner);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a partner
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.name || !request.body.type) {
            return response.status(400).send({
                message: 'Send all required fields: name, type',
            });
        }

        const { id } = request.params;

        const result = await Partner.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Partner not found' });
        }

        return response.status(200).send({ message: 'Partner updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for deleting a partner
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Partner.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Partner not found' });
        }

        return response.status(200).send({ message: 'Partner deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
