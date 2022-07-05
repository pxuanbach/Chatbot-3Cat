const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { model } = require('mongoose');
const bcrypt = require('bcrypt');
const maxAge = 5 * 24 * 60 * 60;
const SALT_WORK_FACTOR = 10

const createJWT = id => {
    return jwt.sign({ id }, 'chatbot secret', {
        expiresIn: maxAge
    })
}

const alertError = (err) => {
    let errors = { username: '', password: '', name: '', email: '', phone: '' }
    if (err.message === 'incorrect username') {
        errors.username = 'This username not found';
        return errors;
    }
    if (err.message === 'incorrect password') {
        errors.password = 'The password is incorrect';
        return errors;
    }
    if (err.code === 11000) {
        if (err.message.includes('username')) {
            errors.username = 'Username already registered'
        }
        if (err.message.includes('email')) {
            errors.email = 'Email already registered';
        }
        if (err.message.includes('phone')) {
            errors.phone = 'Phone number already registered';
        }
        return errors;
    }
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

module.exports.getUserbyUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ "username": username });
        res.status(201).json(user);
        console.log(username);
    } catch (error) {
        let errors = alertError(error);
        console.log(error.message)
        res.status(400).json({ errors })
    }
    res.send()
}

module.exports.updatePersonal = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate({ "username": req.body.username }, {
            "name": req.body.name,
            "career": req.body.career,
            "email": req.body.email,
            "phone": req.body.phone
        });
        console.log(user);
        res.status(201).json(user);
    } catch (error) {
        let errors = alertError(error);
        console.log(error.message)
        res.status(400).json({ errors })
    }
    res.send();
}

module.exports.updatePassword = async (req, res) => {
    const { username, password, token } = req.body;
    if (token) {
        jwt.verify(token, 'chatbot secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
            } else {
                const cryptPass = await bcrypt.hash(password, SALT_WORK_FACTOR);
                let user = await User.findOneAndUpdate({ "username": username }, {
                    "password": cryptPass
                });
                user.password = cryptPass;
                res.json(user);
            }
        })
    } 
}

module.exports.updateAvatar = async (req, res) => {
    const { username, avatar, token } = req.body;
    if (token) {
        jwt.verify(token, 'chatbot secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
            } else {
                let user = await User.findOneAndUpdate({ "username": username }, {
                    "avatar": avatar
                });
                user.avatar = avatar;
                res.json(user);
            }
        })
    } 
}

module.exports.checkEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ "email": email });
        res.status(201).json(user);
        console.log(email);
    } catch (error) {
        let errors = alertError(error);
        console.log(error.message)
        res.status(400).json({ errors })
    }
    res.send()
}

module.exports.checkPhone = async (req, res) => {
    const { phone } = req.params;
    try {
        const user = await User.findOne({ "phone": phone });
        res.status(201).json(user);
        console.log(phone);
    } catch (error) {
        let errors = alertError(error);
        console.log(error.message)
        res.status(400).json({ errors })
    }
    res.send()
}

module.exports.checkPass = async (req, res) => {
    const { check, userPass } = req.body;
    let isAuth = await bcrypt.compare(check, userPass);

    if (isAuth)
        res.status(201).json(true);
    else
        res.status(201).json(false);
    res.send();
}
