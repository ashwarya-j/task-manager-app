const User = require('../models/user.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    let { name , email , password } = req.body;
    let user = await User.findOne({ email });

    if(user) {
        return res.status(400).json({ msg: 'User already exists' });
    }

    password = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({
        name,
        email,
        password
    });

    // Save the user to the database
    await user.save();

    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if(err) throw err;
        res.json({ token });
    });
    
}

exports.login = async (req, res) => {

    let { email, password } = req.body;

    let user = await User.findOne({ email });
    if(!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if(err) throw err;
        res.json({ token });
    });
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}