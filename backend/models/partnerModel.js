import mongoose from "mongoose";

const partnerSchema = mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['company', 'academe'],
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: Buffer,
        },
        address: {
            type: String,
        },
        contact: {
            type: String,
        },
        email: {
            type: String,
        },
        website: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Partner = mongoose.model('Partner', partnerSchema);
