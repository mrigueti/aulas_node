const express = require("express");
const app = express();

const port = 5001;

const path = require(`path`);
const caminho = path.join(__dirname, `pages`);

// faz a conversão do body de texto para json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// trabalhar com POST
app.post("/users/save", (req, res) => {
  console.log(req.body);

  const login = req.body.usuario;
  const senha = req.body.senha;

  console.log(`Login do Usuário: ${login} e a Senha é ${senha}`);
  res.sendFile(`${caminho}/cadastroConfirmado.html`);
});

app.get("/users/cadastrar", (req, res) => {
  res.sendFile(`${caminho}/cadastro.html`);
});

// simula um usuario autenticado
const checaAutorizacao = (req, res, next) => {
  req.authStatus = false;

  if (req.authStatus) {
    console.log("Usuário Autenticado");
  } else {
    console.log("Usuário não Possui Permissão para Acessar");
  }
  next();
};

app.use(checaAutorizacao);

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Usuário ${id} foi Encontrado no Banco`);
  res.sendFile(`${caminho}/users.html`);
});

app.get("/home", (req, res) => {
  res.sendFile(`${caminho}/index.html`);
});

app.get("/", (req, res) => {
  res.send("hello, world");
});

app.use((req, res, next) => {
  res.status(404).sendFile(`${caminho}/404.html`);
});

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
