const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
});

const Task = model('Task', taskSchema);
module.exports = Task;
