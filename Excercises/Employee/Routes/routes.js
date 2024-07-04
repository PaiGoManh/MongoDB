const express = require('express');
const path = require('path');
const sample = require('../Models/EmployeeDetails');

module.exports = (publicPath) => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.sendFile(path.join(publicPath, 'home.html'));
    });

    router.get('/add', (req, res) => {
        res.sendFile(path.join(publicPath, 'add.html'));
    });

    router.get('/update/:id', (req, res) => {
        res.sendFile(path.join(publicPath, 'update.html'));
    });

    router.post('/submit-form', async (req, res) => {
        try {
            const data = req.body;
            console.log(data);
            const details = await sample.create(data);
            res.status(201).redirect('/');
        } catch (error) {
            console.log('error');
            res.status(500).json({ error: 'Failed to submit form' });
        }
    });

    router.get('/employee/:id', (req, res) => {
        res.sendFile(path.join(publicPath, 'employee.html'));
    });

    router.get('/api/employee', async (req, res) => {
        try {
            const emp = await sample.find();
            res.json(emp);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch employee' });
        }
    });

    router.get('/api/employee/:id', async (req, res) => {
        const empid = req.params.id;
        try {
            const details = await sample.findOne({ empid: empid });
            console.log("details", details);
            res.json(details);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch employee' });
        }
    });

    router.put('/api/update/:id', async (req, res) => {
        const empid = req.params.id; 
        const { name, position, department } = req.body;
        try {
            const updatedEmployee = await sample.findOneAndUpdate(
                { empid: empid },
                { name, position, department },
                { new: true }
            );
            if (updatedEmployee) {
                res.json(updatedEmployee);
            } else {
                res.status(404).json({ error: 'Employee not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update employee' });
        }
    });

    router.delete('/api/delete/:id', async (req, res) => {
        const empid = req.params.id;
        try {
            const result = await sample.findOneAndDelete({ empid: empid });
            if (result) {
                res.json({ message: 'Employee deleted successfully' });
            } else {
                res.status(404).json({ error: 'Employee not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete employee' });
        }
    });

    return router;
};
