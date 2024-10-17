const User = require('../models/User');

// Obter lista de favoritos
exports.getFavorites = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user.favorites); // Retorna os IDs dos filmes favoritos
};

// Adicionar filme aos favoritos
exports.addFavorite = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.favorites.push(req.body.id); // Adiciona filme aos favoritos
  await user.save();
  res.send(user.favorites);
};
