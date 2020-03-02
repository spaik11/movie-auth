const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, unique: true, default: '', lowercase: true, trim: true },
    rating: { type: String, default: '', trim: true },
    synopsis: { type: String, lowercase: true, default: '', trim: true },
    releaseYear: { type: Number, default: '', trim: true },
    genre: { type: [], default: [], lowercase: true},
    director: { type: String, lowercase: true, default: '', trim: true },
    boxOffice: { type: Number, default: '', trim: true },
    image: { type: String, default: '' }
});

module.exports = mongoose.model('movie', MovieSchema);
