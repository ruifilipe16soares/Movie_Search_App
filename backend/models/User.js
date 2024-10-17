const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  favorites: [String] // Armazena IDs dos filmes favoritos
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET); // JWT Secret guardado no .env
};

const User = mongoose.model('User', userSchema);
module.exports = User;
