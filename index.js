const express = require("express");
const users = require("./users");

const app = express();

// middleware for crud
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//middleware for logger or get url things
app.use((req, res, next) => {
  console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  next();
});
//basic program
app.get("/", (req, res) => {
  res.send("Hello world!");
});

//get allusers
app.get("/users", (req, res) => {
  res.json(users);
});

//get users by id
app.get("/idUser/:id", (req, res) => {
  users.filter((user) => {
    if (user.id === parseInt(req.params.id)) {
      res.json(user);
    }
  });
});

//create a user
app.post("/newUser", (req, res) => {
  const { username, email } = req.body;
  const newuser = {
    username: username,
    email: email,
    id: 7,
    status: "active",
  };
  users.push(newuser);
  res.json(users);
});

//update username
app.put("/upUser/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const upUser = users.find((user) => user.id === userId);

  if (!upUser) {
    return res.status(404).json({ error: "User not found" });
  }

  const { username, email } = req.body;
  upUser.username = username ? username : upUser.username;
  upUser.email = email ? email : upUser.email;

  res.json({ msg: "Updated user details:", user: upUser });
});

//delete user
app.delete("/del/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const delUser = users.find((user) => user.id === userId);
  users.filter((user) => {
    user.id !== userId;
  });

  res.json({ users: users });
});

// port and starting
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server started at port :${PORT}`);
});
