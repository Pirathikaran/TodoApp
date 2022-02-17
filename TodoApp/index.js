const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB connected");
  }
);

app.use(express.json());

//Routes
app.use("/api/user", authRoutes);
app.use("/api/todo", todoRoutes);

app.listen(5000, () => {
  console.log("Server running...");
});
