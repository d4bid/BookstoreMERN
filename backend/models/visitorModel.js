import mongoose from "mongoose";

const visitorSchema = mongoose.Schema(
    {
        sessionID: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        organization: {
            type: String,
            required: true,
        },

        address: {
            type: String,
        },
        contact: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Visitor = mongoose.model('Visitor', visitorSchema);
