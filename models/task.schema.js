const mongoose = require('mongoose');
const { markTaskComplete } = require('../controllers/taskController');

const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['Work', 'Personal'], required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    deadline: { type: Date },
    completed: { type: Boolean, default: false },
});

taskSchema.methods.markComplete = async function() {
    this.completed = true;
    await this.save();
}

taskSchema.statics.findByCategory = function(category) {
    return this.find({ category });
};

module.exports = mongoose.model('Task', taskSchema);