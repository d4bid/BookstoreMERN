import mongoose from "mongoose";

const frameSchema = mongoose.Schema(
    {
        name: {
            type: String, 
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export const Frame = mongoose.model('Frame', frameSchema);
