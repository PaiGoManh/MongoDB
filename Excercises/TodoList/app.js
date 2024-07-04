const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoRoutes = require('./Routes/route');

const app = express();
dotenv.config();
const url = process.env.mongodb_uri;

mongoose.connect(url, {

}).then(() => {
    console.log("Database Connected");
}).catch((error) => {
    console.error("Error connecting to database:", error);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', todoRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
