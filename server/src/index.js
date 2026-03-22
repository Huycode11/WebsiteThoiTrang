const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/databaseConfig');
const productRoutes = require('./route/productRoute');
const brandRoutes = require('./route/brandRoute');
const categoryRoutes = require('./route/categoryRoute');
const cartRoutes = require('./route/cartRoute');
const wishlistRoutes = require('./route/wishlistRoute');
const dns = require("dns")

dotenv.config();
dns.setServers(["1.1.1.1", "8.8.8.8"])
// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
