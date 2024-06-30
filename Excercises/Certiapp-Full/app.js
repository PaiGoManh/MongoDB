const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const sample =require ('./model/cert.js');
const dotenv = require('dotenv');
dotenv.config();


const uri= process.env.mongodb_uri;
mongoose.connect(
    uri
);

const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/issue', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'issueCertificate.html'));
});

// Route to handle form submissions
app.post('/submit-form', async (req,res)=>{
    try{
        const data=req.body;
        console.log(data);
        const result = await sample.create(data);
        res.status(201).redirect('/thank-you');
    }
    catch(error){
        console.log(error);
        res.status(500).json();
    }
 })

app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'formsubmitted.html'));
});

app.get('/certificate', (req,res) => {
    res.json(certificates);
})

app.get("/certificate/:id", (req, res) => {
//   const id = req.params.id;
//   const certificate = certificates.find((cert) => cert.certificateID == id);
//   if (!certificate) {
//     return res.status(404).send("Certificate not found");
//   }

  res.sendFile(path.join(__dirname, 'public', 'view.html'));
  
});

app.get('/api/certificate/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
   const details = await sample.findOne({certid: id});
    res.json(details);
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});