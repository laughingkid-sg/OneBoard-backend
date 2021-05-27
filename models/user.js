const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')

const {ObjectId} = mongoose.Schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 64
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 64
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 128
    },
    hashed_password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        trim: true,
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    },
    history: {
        type: Array,
        default: []
    },
    boards: [{ 
        type: ObjectId, 
        ref: 'Boards',
        required: true
    }]
}, {timestamps : true}
);

// virtual field
userSchema.virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = uuidv1()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
    return this._password
})

userSchema.methods = {
    authenticate: function(input) {
        return this.encryptPassword(input) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

module.exports = mongoose.model('User', userSchema);