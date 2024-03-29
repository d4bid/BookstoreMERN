import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model('Token', tokenSchema);

export default Token;
