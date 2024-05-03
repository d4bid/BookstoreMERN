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

        position: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            required: true,
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
