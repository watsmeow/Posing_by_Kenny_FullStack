const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productname: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        img: {
            type: String,
        },
        size: {
            type: String,
        },
        category: {
            type: Array,
        },
        price: {
            type: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);