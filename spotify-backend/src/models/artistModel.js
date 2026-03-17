import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, // Artist profile image
}, { timestamps: true });

const artistModel = mongoose.models.artist || mongoose.model('artist', artistSchema);

export default artistModel;
