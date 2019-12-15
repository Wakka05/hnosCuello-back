const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    title: {type: String, required: true, max: 100},
    price: {type: String, required: true},
    idImage: {type: String},
    idCategory: {type: String, required: true}
}, { collection: 'product' });


// Export the model
module.exports = mongoose.model('Product', ProductSchema);
