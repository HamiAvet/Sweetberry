const { Schema, model } = require('mongoose');

const schema = new Schema({
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    date: { type: String, required: true },
    items: { type: Object, required: true }
});

module.exports = model('Order', schema);
