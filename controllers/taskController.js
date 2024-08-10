
const Task = require('../models/task.schema');

exports.createTask = async (req, res) => {
    const { title, description, category, priority, deadline } = req.body;
    try {
        const task = new Task({
            user: req.user.id,
            title,
            description,
            category,
            priority,
            deadline
        });

        await task.save();
        res.status(201).json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(201).json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


exports.getTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    try {
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        res.status(201).json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { title, description, category, priority, deadline, completed } = req.body;
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        task.title = title || task.title;
        task.description = description || task.description;
        task.category = category || task.category;
        task.priority = priority || task.priority;
        task.deadline = deadline || task.deadline;
        task.completed = completed !== undefined ? completed : task.completed;
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        // Delete the task
        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({ msg: 'Task removed' });

    } catch (err) {
        res.status(500).json({ msg: 'Server error' , err: err.message});
    }
}

exports.markTaskComplete = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        await task.markComplete();
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', err: err.message });
    }
}

exports.getTasksByCategory = async (req, res) => {
    try {
        const tasks = await Task.findByCategory(req.params.category);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}