const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const mongoose = require('mongoose');

// Routes
const userRouter = require('./src/routers/authentication/user');
const tasksRouter = require('./src/routers/tasks/task');

// Middleware
app.use(express.json());

// Use Routes
app.use('/tasks', tasksRouter);  // This ensures that the '/tasks' path will use task routes like '/tasks/create'

// MongoDB Connection
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Database connection established successfully'))
  .catch((error) => {
    console.error('Failed to connect to DB:', error);
    process.exit(1);  // Optionally exit the process if DB connection fails
  });

// Start Server
const PORT = process.env.PORT || 5000;  // Default to 5000 if PORT is not defined
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} ✅`);
});
