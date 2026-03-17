import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';
import artistRoute from './src/routes/artistRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors({
    origin: [
      'https://soul-tune.vercel.app',
      'https://soul-tune-admin.vercel.app'
    ],
    credentials: true
  }));  
  
// initializing routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.use("/api/artist", artistRoute); // Use the artist routes

app.get('/', (req, res) => {
    res.send('Annyeonghaseyo...💜');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on http://localhost:${port}`);
});