require('dotenv').config();

const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const handle = require('./handlers');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', routes.auth);
app.use('/api/polls', routes.poll);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(handle.error);

// Start the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
