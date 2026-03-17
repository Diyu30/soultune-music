import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/songModel.js';

const addSong = async (req, res) => {
    try {
        const { name, desc, album, artist } = req.body;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type: "video"});
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`

        const songData = {
            name,
            desc,
            album,
            artist,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        const song = songModel(songData);
        await song.save();

        res.json({ success: true, message: 'Song Inserted Successfully' });

    } catch (error) {
        console.error(error); // Log the error to understand the root cause
        res.json({ success: false, message: 'Error to insert song', error: error.message });
    }
}

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({});
        res.json({ success: true, message: 'Songs Retrieved Successfully', songs: allSongs });

    } catch (error) {
        res.json({ success: false, message: 'Error to get songs' });
    }
}

const removeSong = async (req, res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Song Removed Successfully' });

    } catch (error) {
        res.json({ success: false, message: 'Error to delete songs' });
    }
}

// New updateSong function
const updateSong = async (req, res) => {
    try {
        const { id } = req.params; // Song ID from request params
        const { name, desc, album, artist } = req.body;
        let updateData = {}; // Store only fields that need to be updated

        // If any field is provided in the body, add it to updateData
        if (name) updateData.name = name;
        if (desc) updateData.desc = desc;
        if (album) updateData.album = album;
        if (artist) updateData.artist = Array.isArray(artist) ? artist : [artist];

        // Check if files are uploaded
        if (req.files && req.files.image) {
            const imageFile = req.files.image[0];
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            updateData.image = imageUpload.secure_url;
        }

        if (req.files && req.files.audio) {
            const audioFile = req.files.audio[0];
            const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
            updateData.file = audioUpload.secure_url;
            updateData.duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;
        }

        // Update only the provided fields
        const updatedSong = await songModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });

        if (!updatedSong) {
            return res.status(404).json({ success: false, message: 'Song not found' });
        }

        res.json({ success: true, message: 'Updated Successfully' });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error updating song', error: error.message });
    }
};


export { addSong, listSong, removeSong, updateSong  };