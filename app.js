const bcrypt = require("bcryptjs");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const {connectDatabase } = require("./config/database")
connectDatabase();
port = 4000
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser)

const post = require("./routes/post")
const user = require("./routes/user")


app.use("/api/", post)
app.use("/api/", user)

app.listen(port, () => {
    console.log(`Server is running oat ${port}`);
  });

module.exports = app;