const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['Work', 'Personal'], required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    deadline: { type: Date },
    completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);