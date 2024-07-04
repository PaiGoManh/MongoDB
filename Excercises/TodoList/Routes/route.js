// routes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const Task = require('../Models/todo');

router.use(express.static(path.join(__dirname, '..', 'public')));

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
});

router.get('/tasks', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'task.html'));
});

router.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'success.html'));
});

router.post('/submit-form', async (req, res) => {
    try {
        const { id, title, description } = req.body;
        const task = await Task.create({ id, title, description });
        res.status(201).redirect('/addtask'); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add task' });
    }
});


router.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

router.delete('/api/task/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

router.put('/api/task/:id', async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});


module.exports = router;
