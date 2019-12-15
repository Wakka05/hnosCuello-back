const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

// U1 = admin, U0 = viewer
const UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    surnames: {type: String, required: true, max: 100},
    picture: {type: String},
    roles: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    idOrder: {type: []},
    favorites: {type: []}
}, { collection: 'user' });

UserSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        surnames: this.surnames,
        roles: this.roles,
        exp: parseInt(expiry.getTime() / 1000)
    }, 'MY_SECRET')
};

// Export the model
const User = mongoose.model('User', UserSchema);
module.exports = User;
