const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = require("./conf");

app.get("/", (req, res) => {
  connection.query(`SELECT * FROM user`, (err, results, fields) => {
    res.send(results);
  });
});

app.post("/register", (req, res) => {
  let user = {
    username: req.body.username,
    password: req.body.password,
    description: req.body.description,
  };

  connection.query(
    `INSERT INTO user SET ? `,
    [user],
    (err, results, fields) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    }
  );
});

app.listen(port, (err) => {
  if (err) throw new Error("ups something is not working");
  console.log(`Great, your server is running on port: ${port}`);
});
