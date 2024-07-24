const express = require('express');
const app = express();

// Definição da porta utilizada no servidor
const PORT = 3000;

// Rota para a página inicial (/)
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

// Servidor em execução e exibindo o numero da porta.
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
