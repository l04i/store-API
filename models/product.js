const mongoose = require('mongoose');

const productShcema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must be provided']
    },
    price: {
        type: Number,
        required: [true, 'Price must be provided']
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: `{value} is not supported`,
        }
    }
}, { timestamps: true });

const Product = mongoose.model('product', productShcema);
module.exports = Product;