const express = require('express');
const app = express();
const path= require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const sample =require('./Models/Blogs')


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// const blogPosts = [];
dotenv.config();
const url = process.env.mongodb_uri;
mongoose.connect(
    url
)

// const database=mongoose.connecttion
const database = mongoose.connection;
database.on("error", (error) =>{
    console.log(error)
});
database.once("connected", () =>{
    console.log("Databse Connected");
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'))
})

app.get('/submitted', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submit.html'))
})

app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewblog.html'))
})


app.post('/submit-form',async(req, res) => {
    try{
        const data=req.body;
        console.log(data)
        const details=await sample.create(data);
        res.status(201).redirect('./submitted');
    }
    catch(error){
        console.log(error);
        res.status(500).json();
    }
});

// app.get('/viewallblogs', (req, res) => {
//     res.send(blogPosts)
// })

app.get('/blog/:id', (req,res) => {
    // const id = req.params.id;
    // const blogs = blogPosts.find((blog) => blog.BlogID == id);
    // if (!blogs) {
    //   return res.status(404).send("Blog not found");
    // }
  
    res.sendFile(path.join(__dirname, 'public', 'viewblog.html'));
})

app.get('/api/blog/:id',async (req,res) => {
    const id = req.params.id;
    const details = await sample.findOne({BlogID: id});
//  const details = await sample.find({});
    console.log("details",details);
    res.json(details);
})

// app.post('/blog', (req,res) => {
//     const {BlogID, title, author, content } = req.body;
//     console.log(req.body);
//     const newPost = {BlogID, title, author, content };
//     blogPosts.push(newPost);
//     console.log(blogPosts);
//     res.redirect('/submitted');
// })

app.listen(3000, () => {
    console.log("The server is starting")
})