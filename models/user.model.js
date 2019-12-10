const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// U1 = admin, U0 = viewer
let UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    title: {type: String, required: true, max: 100},
    picture: {type: String},
    roles: {type: string, required: true},
    email: {type: String, required: true},
    favorites: {type: []}
}, { collection: 'user' });


// Export the model
module.exports = mongoose.model('User', UserSchema);
