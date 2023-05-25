import mongoose, { Schema, Document } from "mongoose";

export interface IUrl extends Document {
  longUrl: string;
  shortUrl: string;
  shortCode: string;
  createdAt: Date;
}

const urlSchema = new Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Url = mongoose.model<IUrl>("Url", urlSchema);

export default Url;
