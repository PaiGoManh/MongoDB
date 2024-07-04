const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./Routes/routes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config();
const url = process.env.mongodb_uri;

mongoose.connect(url);

const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database connected");
});

app.use('/', routes(path.join(__dirname, 'public')));

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(3003, () => {
    console.log("Server is running on port 3003");
});
