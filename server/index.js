const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const database = require("./config/database");

const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

database.connect();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "*",
    credentials: true,
  })
);
// Function to serve all static files
// inside public directory.
app.use(express.static("public/uploads"));
app.use("/uplaods", express.static("images"));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);

//default route
app.get("/", (req, res) => {
  console.log("Called");
  return res.json({
    success: true,
    messsage: "Your server is up and running...",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
