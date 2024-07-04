const express = require('express');
const router = express.Router();
const path = require('path');
const sample = require('../model/cert.js');

// GET homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// GET issue certificate form
router.get('/issue', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'issueCertificate.html'));
});

// POST form submission
router.post('/submit-form', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const result = await sample.create(data);
        res.status(201).redirect('/thank-you');
    } catch (error) {
        console.error(error);
        res.status(500).json();
    }
});

// GET thank you page
router.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'formsubmitted.html'));
});

// GET all certificates (replace with your logic)
router.get('/certificate', (req, res) => {
    res.json(certificates); // Assuming certificates is defined elsewhere
});

// GET single certificate by ID
router.get("/certificate/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const details = await sample.findOne({ certid: id });
        if (!details) {
            return res.status(404).send("Certificate not found");
        }
        res.sendFile(path.join(__dirname, '..', 'public', 'view.html'));
    } catch (error) {
        console.error('Error fetching certificate details:', error);
        res.status(500).json({ message: 'Failed to fetch certificate' });
    }
});

// GET single certificate by ID (API endpoint)
router.get('/api/certificate/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const details = await sample.findOne({ certid: id });
        if (!details) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        res.json(details);
    } catch (error) {
        console.error('Error fetching certificate details:', error);
        res.status(500).json({ message: 'Failed to fetch certificate' });
    }
});

module.exports = router;
