const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OrderSchema = new Schema({
    product: {type: {
        name: {type: String, required: true, max: 100},
        title: {type: String, required: true, max: 100},
        price: {type: String, required: true},
        idCategory: {type: String, required: true}
    }, required: true},
    quantity: {type: Number, required: true},
    finalPrice: {type: String, required: true}
}, { collection: 'order' });


// Export the model
module.exports = mongoose.model('Order', OrderSchema);