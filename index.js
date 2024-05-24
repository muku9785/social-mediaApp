const app = require("./app")
const port = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  const newUser = new User({
    firstname,
    lastname,
    username,
    email,
    password,
  });

  newUser
    .save()
    .then(() => {
      console.log(newUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error registering user");
    });

  function deletedata() {
    console.log("Deleting all data");
    User.findOneAndDelete({ username, password });
    console.log("Data deleted", newUser);
  }
  setTimeout(deletedata, 5000);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username, password })
    .then((user) => {
      if (user) {
        res.send("login succesful");
      } else {
        res.status(401).send("Invalid credentials");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error logging in");
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
