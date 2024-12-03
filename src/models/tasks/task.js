const mongoose = require('mongoose');

// Define the Task schema
const TaskSchema = new mongoose.Schema({
    task_name: { type: String, required: true },
    description: { type: String },
    assigned_to: { type: String },  // You may want to reference a user ID here
    due_date: { type: Date },
    priority_level: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status: { type: String, enum: ['not started', 'in progress', 'completed', 'blocked', 'on hold'], default: 'not started' },
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

// Create the Task model
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
