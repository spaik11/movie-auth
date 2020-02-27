const mongoose = require('mongoose');

// create blueprint for inputs into database
// word will have type string, must be unique, have default, convert to lowercase
// definition will be type string, to lowercase, and have a default
const MovieSchema = new mongoose.Schema({
    title: { type: String, unique: true, default: '', lowercase: true, trim: true },
    rating: { type: String, default: '', trim: true },
    synopsis: { type: String, default: '', trim: true },
    releaseYear: { type: Number, default: '', trim: true },
    genre: { type: [], trim: true },
    director: { type: String, default: '', trim: true },
    boxOffice: { type: Number, default: '', trim: true },
    image: { type: String, default: '' }
});

module.exports = mongoose.model('movie', MovieSchema);
