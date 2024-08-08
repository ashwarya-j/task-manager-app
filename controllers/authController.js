const User = require('../models/user.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    let { name , email , password } = req.body;
    let user = await User.findOne({ email });

    if(user) {
        return res.status(400).json({ msg: 'User already exists' });
    }

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
}

exports.getUser = async (req, res) => {
}