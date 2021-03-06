const User = require('../models/User');
const jwt = require('jsonwebtoken');
const maxAge = 5 * 24 * 60 * 60;

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

module.exports.signup = async (req, res) => {
    const { username, password, email, phone } = req.body;

    try {
        const user = await User.create({ 
            username, 
            password, 
            name: username, 
            email, 
            phone
        });
        res.status(201).json(user);
    } catch (error) {
        let errors = alertError(error);
        console.log('This is ERROR', error.message)
        res.status(400).json({ errors })
    }
    res.send()
}

module.exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    try {
        const user = await User.login(username, password);
        const token = createJWT(user._id);
        res.status(201).json({ user, token });
    } catch (error) {
        let errors = alertError(error);
        console.log(error.message)
        res.status(400).json({ errors })
    }
    res.send()
}
module.exports.verifyuser = (req, res, next) => {
    const token = req.params.token;
    //console.log(req.cookies.jwt)
    if (token) {
        jwt.verify(token, 'chatbot secret', async (err, decodedToken) => {
            console.log('decoded Token', decodedToken);
            if (err) {
                console.log(err.message)
            } else {
                let user = await User.findById(decodedToken.id);
                res.json(user);
                next();
            }
        })
    } else {
        next();
    }
}
module.exports.logout = (req, res) => {
    //do something
    res.status(200).json({ logout: true })
}