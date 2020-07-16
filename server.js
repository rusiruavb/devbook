const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8056;

app.use(cors());
app.use(express.json());

const URI = process.env.URI;

mongoose.connect(URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection success");
});

// user routes
app.use("/user", require("./routes/user.route"));

app.listen(PORT, () => {
  console.log(`Server is up and running port ${PORT}`);
});
