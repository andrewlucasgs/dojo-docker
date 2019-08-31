const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./db");

pool.connect((err, client, done) => {
  client.query(
    `CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100),
        idade INT
      )`,
    [],
    (err, result) => {
      done();
      if (err) {
        return console.error("error running query", err);
      }
    }
  );
});

router.use("/create", (req, res) => {
  nome = req.query.n;
  idade = req.query.i;
  if (!nome || !idade) {
    res.send("error");
  } else {
    pool.connect((err, client, done) => {
      client
        .query(`INSERT INTO usuarios (nome,idade) VALUES ($1,$2)`, [
          nome,
          idade
        ])
        .then(data => res.send("ok"))
        .catch(err => res.send("error"));
    });
  }
});

router.use("/", (req, res) => {
  pool.connect((err, client, done) => {
    client
      .query(`SELECT * from usuarios;`)
      .then(data => res.send(data.rows))
      .catch(err => res.send("error"));
  });
});
app.use("/", router);

app.listen(3000, function() {
  console.log("Listening on port 3000!");
});
