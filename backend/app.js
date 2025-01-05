require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const productsListRoutes = require('./routes/productsList');
const usersRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const uploadRoutes = require('./routes/upload');

const port = 3001;
const app = express();

app.use(express.static('../frontend/build'))
app.use(cookieParser());
app.use(express.json());

app.use('/', authRoutes);
app.use('/productsList', productsListRoutes);
app.use('/users', usersRoutes);
app.use('/shoppingCart', cartRoutes);
app.use('/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));

mongoose.connect(
    process.env.DB_CONNECTION_STRING
).then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })
})