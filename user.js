const express = require("express");
const bycrpt = require("bcrypt");
const app = express();

const users = [
  { username: "user1@wwh.com", password: "12345" },
  { username: "user2@wwh.com", password: "67891" },
  { username: "user3@gwwh.com", password: "98765" },
];

app.use(express.json());

app.get("/users", (req, res) => { 
  res.json(users);
});

app.post("/users", (req, res) => {
  users.push(req.body);
  res.json(req.body);
});

app.listen(5000, () => console.log("server running on port 5000"));
