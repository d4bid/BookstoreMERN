import mongoose from "mongoose";

const slideshowSchema = mongoose.Schema(
    {
        name: {
            type: String, 
            required: true,
        },
        image: {
            type: Buffer,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export const Slideshow = mongoose.model('Slideshow', slideshowSchema);
