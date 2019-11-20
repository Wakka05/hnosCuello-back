const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    title: {type: String, required: true, max: 100},
    picture: {type: String},
    roles: {type: [], required: true},
    email: {type: String, required: true}
}, { collection: 'user' });


// Export the model
module.exports = mongoose.model('User', UserSchema);
