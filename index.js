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

  //bcrypt
  //.hash(req.body.password, 10)
  //.then((hashedPassword) => {
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
})
/*.catch(hasError => console.error(`Error hashing password. Error: ${hasError}`))

})


app.post('/login', (req,res) => {
  console.log('login!', req.body)

  connection.query(`SELECT * from user WHERE username='${req.body.username}'`, (err,results) => {
    if(err){
      res.status(500).send('We could not find a user with that username :(')
    } else {
      bcrypt
        .compare(req.body.password, results[0].password)
        .then((isThereAMatch) => {
          if(isThereAMatch){
            res.json({
              username: results[0].username,
              description: results[0].description,
              message:'You have successfully logged in!',
              token: '12863vf178dfb1092d8h1º9d'
            })
          } else {
            res.send('Wrong password, get out!')
          }
        })
    }
  })
})*/


app.listen(port, (err) => {
  if (err) throw new Error("ups something is not working");
  console.log(`Great, your server is running on port: ${port}`);
});
