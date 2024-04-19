import mongoose from "mongoose";

const slideshowSchema = mongoose.Schema(
    {
        image: {
            type: Buffer,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true, // Set default value to true
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export const Slideshow = mongoose.model('Slideshow', slideshowSchema);
