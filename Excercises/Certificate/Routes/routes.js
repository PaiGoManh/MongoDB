const express = require('express');
const router = express.Router();
const path = require('path');
const sample = require('../model/cert.js');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

router.get('/issue', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'issueCertificate.html'));
});

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

router.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'formsubmitted.html'));
});

router.get('/certificate', (req, res) => {
    res.json(certificates)
});

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
