// <!-- Meghna Bilimoria - 301127778 - 28th Oct 2020. -->
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  Title:{
        type: String,
        required: true
    },
    Price:{
        type: String,
        required: true
    },
    Author:{
        type: String,
        required: true
    },
    Genre:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('books', bookSchema);