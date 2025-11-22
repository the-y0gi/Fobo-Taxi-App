const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const http = require('http');
const socketIo = require('socket.io');
const Redis = require('redis');
require('dotenv').config();

const connectDB = require('./config/database'); 

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();
const server = http.createServer(app);

// Redis
// const redisClient = Redis.createClient({
//   url: process.env.REDIS_URL
// });

// redisClient.on('error', (err) => console.log('Redis Client Error', err));
// redisClient.connect();

// Socket.io
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Security Middlewares
app.use(helmet());
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100
});
app.use(limiter);

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

connectDB();

// Test Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'TAXI Backend API is running!',
    version: '1.0.0'
  });
});

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use("/api/ride", require("./routes/user"));


// Socket Handler
// require('./sockets/socketHandler')(io, redisClient);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Server listen
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`TAXI Backend Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

