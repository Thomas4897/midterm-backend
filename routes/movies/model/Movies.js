const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        title: String,
        director: String,
        runtime: Number,
        rating: Number,
        description: String,
    },
    { timestamps: true },

);

module.exports = mongoose.model('movie', movieSchema)