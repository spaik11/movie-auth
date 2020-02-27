const mongoose = require('mongoose');

// create blueprint for inputs into database
// word will have type string, must be unique, have default, convert to lowercase
// definition will be type string, to lowercase, and have a default
const UserSchema = new mongoose.Schema({
    name: { type: String, default: '', lowercase: true, trim: true },
    email: { type: String, default: '', unique: true, lowercase: true, trim: true },
    password: { type: String, default: '', trim: true }
});

module.exports = mongoose.model('user', UserSchema);
