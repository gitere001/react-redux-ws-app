// index.js or server.js
import express from 'express';
import dotenv from 'dotenv';
import corsMiddleware from './config/cors.js';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import http from 'http';
import { setupWebSocket } from './config/websocket.js';
import courseRoutes from './routes/course.routes.js';
import studentRoutes from './routes/student.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect DB
connectDB();

// Middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);

// Create HTTP server
const server = http.createServer(app);

// Setup WebSocket on HTTP server
setupWebSocket(server);

// ✅ Start listening using the HTTP server (not app.listen!)
server.listen(PORT, () => {
  console.log(`✅ Server and WebSocket running on port ${PORT}`);
});
