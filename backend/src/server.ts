import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import { connectRedis } from './config/redis';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();

connectDB();
connectRedis();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
