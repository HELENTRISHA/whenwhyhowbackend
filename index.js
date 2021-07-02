const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = require("./conf");

app.get("/", (req, res) => {
  connection.query(`SELECT * FROM user`, (err, results, fields) => {
    res.send(results);
  });
});

app.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  connection.query(
    `INSERT INTO user (username, password) VALUES (?, ?) `,
    [req.body.username, hashedPassword],
    (err, results, fields) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(results);
      }
    }
  );
});

app.post("/login", (res, req) => {
  console.log("login", req.body);

  connection.query(`SELECT* from user WHERE  ${req.body.username}`),
    (err, results) => {
      if (err) {
        res.status(500).send("we could not find your username");
      } else {
        console.log(results);
      }
    };
});

app.listen(port, (err) => {
  if (err) throw new Error("ups something is not working");
  console.log(`Great, your server is running on port: ${port}`);
});
