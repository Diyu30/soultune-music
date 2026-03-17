import express from 'express';
import { addArtist, listArtists, removeArtist } from '../controllers/artistController.js';
import upload from "../middleware/multer.js";

const artistRoute = express.Router();

artistRoute.post('/add', upload.single('image'), addArtist);
artistRoute.get('/list', listArtists);
artistRoute.post('/remove', removeArtist);

export default artistRoute;
