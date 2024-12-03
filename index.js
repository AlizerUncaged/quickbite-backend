require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const path = require('path');

// Import routes
const foodRoutes = require('./routes/food-routes');
const cartRoutes = require('./routes/cart-routes');
const cartItemRoutes = require('./routes/cart-item-routes');
const sequelize = require('./config/database');

// Initialize express app
const app = express();

// Set up middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(compression()); // Compress responses

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/foods', foodRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/cart-items', cartItemRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
        res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(err.status || 500).json({
                error: {
                        message: err.message || 'Internal server error',
                        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
                }
        });
});

// Handle 404 routes
app.use((req, res) => {
        res.status(404).json({ error: 'Route not found' });
});

// Set port
const PORT = process.env.PORT || 3000;

// Database connection and server startup
const startServer = async () => {
        try {
                // Test database connection
                await sequelize.authenticate();
                console.log('Database connection established successfully.');

                // Sync database models (in development)
                if (process.env.NODE_ENV === 'development') {
                        await sequelize.sync({ alter: true });
                        console.log('Database models synchronized.');
                }

                // Start server
                app.listen(PORT, () => {
                        console.log(`Server is running on port ${PORT}`);
                        console.log(`Environment: ${process.env.NODE_ENV}`);
                });
        } catch (error) {
                console.error('Unable to start server:', error);
                process.exit(1);
        }
};

// Start the server
startServer();

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
        console.error('Unhandled rejection:', err);
        // Don't immediately exit in production
        if (process.env.NODE_ENV === 'development') {
                process.exit(1);
        }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
        console.error('Uncaught exception:', err);
        // Don't immediately exit in production
        if (process.env.NODE_ENV === 'development') {
                process.exit(1);
        }
});

module.exports = app; // For testing purposes