const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes");
require("dotenv").config();

const app = express();
const { PORT = 3000 } = process.env;

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to database."))
  .catch(console.error);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
