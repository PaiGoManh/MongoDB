const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/tododb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'todohome.html'));
});

app.get('/addtask', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addTask.html'));
});

app.get('/tasks', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewTasks.html'));
});

app.get('/task/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'task.html'));
});

// API routes
app.get('/api/tasks', async (req, res) => {
    const tasks = await Todo.find();
    res.json(tasks);
});

app.get('/api/task/:id', async (req, res) => {
    const id = req.params.id;
    const task = await Todo.findById(id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});

app.post('/addtask', async (req, res) => {
    const { title, description } = req.body;
    const newTask = new Todo({
        title,
        description
    });
    await newTask.save();
    res.redirect('/tasks');
});

app.post('/updatetask/:id', async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    const task = await Todo.findByIdAndUpdate(id, {
        title,
        description
    }, { new: true });
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.redirect('/tasks');
});

app.post('/deletetask/:id', async (req, res) => {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.redirect('/tasks');
});

// Handle 404
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start server
const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
