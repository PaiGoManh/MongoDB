const express = require('express');
const router = express.Router();
const path = require('path');
const sample = require('../Models/Blogs'); 

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

router.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'blog.html'));
});

router.get('/submitted', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'submit.html'));
});

router.get('/blog/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const details = await sample.findOne({ BlogID: id });
        if (!details) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.sendFile(path.join(__dirname, '..', 'public', 'viewblog.html'));
    } catch (error) {
        console.error('Error fetching blog details:', error);
        res.status(500).json({ message: 'Failed to fetch blog details' });
    }
});

router.post('/submit-form', async (req, res) => {
    try {
        const data = req.body;
        const details = await sample.create(data);
        res.status(201).redirect('/submitted');
    } catch (error) {
        console.error('Error submitting blog:', error);
        res.status(500).json({ message: 'Failed to submit blog' });
    }
});

router.put('/update-blog/:id', async (req, res) => {
    const id = req.params.id;
    const { title, author, content } = req.body;
    try {
        const updatedBlog = await sample.findOneAndUpdate({ BlogID: id }, { title, author, content }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.redirect(`/blog/${id}`);
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Failed to update blog' });
    }
});

router.delete('/api/blog/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedBlog = await sample.findOneAndDelete({ BlogID: id });
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(204).end(); 
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: 'Failed to delete blog' });
    }
});

module.exports = router;
