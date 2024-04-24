import express, { request, response } from "express";
import { PORT, mongoDBURL, mongoDBURLLocal } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import framesRoute from './routes/framesRoute.js';
import photosRoute from './routes/photosRoute.js';
import partnersRoute from './routes/partnersRoute.js';
import slideshowRoute from './routes/slideshowRoute.js';
import visitorsRoute from './routes/visitorsRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json({ limit: '50mb' })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
app.use(cors());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

app.use('/books', booksRoute);
app.use('/frames', framesRoute);
app.use('/photos', photosRoute);
app.use('/partners', partnersRoute);
app.use('/slideshow', slideshowRoute);
app.use('/visitors', visitorsRoute);

mongoose
    .connect(mongoDBURLLocal)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });