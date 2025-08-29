import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';


const app = express()

await connectCloudinary()
app.use(cors({
  origin: "https://quick-ai-brown.vercel.app", 
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json())
app.use(clerkMiddleware({secretKey: process.env.CLERK_SECRET_KEY}))



app.get('/', (req, res)=>res.send('Server is Live!'))
app.use(requireAuth())
app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Server is running on port', PORT);
})
