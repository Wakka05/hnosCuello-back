const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ResourceSchema = new Schema({
    image: {
        data: Buffer,
        content: String
    },
}, { collection: 'resource' });


// Export the model
module.exports = mongoose.model('Resource', ResourceSchema);