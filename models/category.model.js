const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name: {type: String, required: true, max: 100},
    title: {type: String, required: true, max: 100},
}, { collection: 'category' });


// Export the model
module.exports = mongoose.model('Category', CategorySchema);
