import { v2 as cloudinary } from 'cloudinary';
import artistModel from '../models/artistModel.js';

const addArtist = async (req, res) => {
    try {
        const { name } = req.body;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        const artistData = {
            name,
            image: imageUpload.secure_url,
        };

        const artist = new artistModel(artistData);
        await artist.save();

        res.json({ success: true, message: 'Artist Inserted Successfully' });

    } catch (error) {
        res.json({ success: false, message: 'Error inserting artist' });
    }
};

const listArtists = async (req, res) => {
    try {
        const allArtists = await artistModel.find({});
        res.json({ success: true, message: 'Artists Retrieved Successfully', artists: allArtists });

    } catch (error) {
        res.json({ success: false, message: 'Error retrieving artists' });
    }
};

const removeArtist = async (req, res) => {
    try {
        await artistModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Artist Removed Successfully' });

    } catch (error) {
        res.json({ success: false, message: 'Error deleting artist' });
    }
};

export { addArtist, listArtists, removeArtist };
