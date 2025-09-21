require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const conectDB = require("./config/dbConect");
const corsOptions = require("./config/corsOptions");

// יצירת האפליקציה
const app = express();

// חיבורים למסד הנתונים
conectDB();

// הגדרות כלליות
app.use(express.json());
app.use(express.static("public"));
app.use(cors(corsOptions)); // הגדרת CORS לפי הרשימה הלבנה

// ראוטים
app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.use("/api/reviews",  require("./routs/reviewRoutes"));

app.use("/api/tasks", require("./routs/taskRouts"));
app.use("/api/users", require("./routs/userRouts"));
app.use("/api/auth", require("./routs/authRoute"));
app.use("/api/products", require("./routs/productRouts"));
app.use("/api/cart", require("./routs/cartRouts"));

// חיבור לשרת
const PORT = process.env.PORT || 2345;
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
