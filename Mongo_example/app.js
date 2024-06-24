const {mongoose} = require ('mongoose');
const dotenv = require ('dotenv');
require('dotenv').config();

const routes=require('./routes.js')
const express=require('express');
const app=express();
const PORT = 3006;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);


});
app.use(express.json());
app.use('/',routes);

// console.log('MongoDB URI:', process.env.MONGO_URI);


const uri = process.env.MONGODB_URL
mongoose.connect(
   uri// using connection string directly
);
const database = mongoose.connection;
database.on("error", (error) => {
   console.log(error);
});
database.once("connected", () => {
   console.log("Database Connected");
});