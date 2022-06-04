const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Dupplicate'],
        required: [true, 'Please enter a username'],
        minlength: [6, 'The username should be at least 6 characters long'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'The password should be at least 6 characters long'],
    },
    avatar: String,
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter a email'],
        unique: [true, 'Dupplicate'],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        unique: [true, 'Số điện thoại đã tồn tại'],
    },
    career: String, 
})

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        console.log('no hash', user.password)
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            console.log('hash', user.password)
            next();
        });
    });
});

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({username});
    
    if (user) {
        let isAuth = await bcrypt.compare(password, user.password);
        if (isAuth) {
            return user;
        }
        console.log(password, user.password, isAuth)
        throw Error('incorrect password');
        
    } else {
        throw Error('incorrect username');
    }
}

const User = mongoose.model('users', userSchema)
module.exports = User;