const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const uri = process.env.mongodb_uri;
mongoose.connect(uri);
const database = mongoose.connection;
database.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});
database.once("connected", () => {
    console.log("MongoDB connected successfully");
});

const certificateRoutes = require('./Routes/routes');
app.use('/', certificateRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
