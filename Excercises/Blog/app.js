const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
const url = process.env.mongodb_uri;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;
database.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});
database.once("connected", () => {
    console.log("MongoDB connected successfully");
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./Routes/blogRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
