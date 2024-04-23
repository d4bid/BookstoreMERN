import mongoose from "mongoose";

const photoSchema = mongoose.Schema(
    {
        image: {
            type: Buffer,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export const Photo = mongoose.model('Photo', photoSchema);
