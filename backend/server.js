require('dotenv').config(); // Carregar variáveis de ambiente
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const port = 5000;

// Conexão ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB Atlas!');
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB Atlas', err);
});

app.use(cors());
app.use(express.json());

// Roteamento
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', reviewRoutes);

app.listen(port, () => {
  console.log(`Servidor a correr na porta ${port}`);
});
