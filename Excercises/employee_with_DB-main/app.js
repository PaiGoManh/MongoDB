const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const sample = require('./Models/EmployeeDetails')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config();
const url = process.env.mongodb_uri;
mongoose.connect(url);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error)
});
database.once("connected", () => {
    console.log("Database connected")
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add.html'));
});

app.get('/update/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'update.html'));
});

app.post('/submit-form', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const details = await sample.create(data);
        res.status(201).redirect('./');
    } catch (error) {
        console.log('error');
        res.status(500).json;
    }
});

app.get('/employee/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'employee.html'));
});

app.get('/api/employee', async (req, res) => {
    try {
        const emp = await sample.find();
        res.json(emp);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
});

app.get('/api/employee/:id', async (req, res) => {
    const empid = req.params.id; // empid
    try {
        const details = await sample.findOne({ empid: empid }); //  empid
        console.log("details", details);
        res.json(details);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
});

app.put('/api/update/:id', async (req, res) => {
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

app.delete('/api/delete/:id', async (req, res) => {
    const empid = req.params.id; // Changed from id to empid
    try {
        const result = await sample.findOneAndDelete({ empid: empid }); // empid
        if (result) {
            res.json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete employee' });
    }
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(3003, () => {
    console.log("Server is running on port 3003");
});
