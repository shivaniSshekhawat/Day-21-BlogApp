import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import { connectRedis } from './config/redis';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import paymentRoutes from './routes/paymentRoutes';
import path from 'path';

dotenv.config();

connectDB();
connectRedis();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the frontend/dist folder
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/payments', paymentRoutes);

// Catch-all route to serve the frontend's index.html
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API Route Not Found' });
  }
  
  const indexPath = path.join(frontendPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend not built. Please run "npm run build" in the frontend directory.');
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
