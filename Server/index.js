require('dotenv').config();
const PORT = process.env.PORT || 5000;
const cors = require('cors');


const express = require('express');
const app = express();

// Database Connection
const connectDB = require('./src/config/db');
connectDB();

//Required Routes
const userRoutes = require("./src/routes/user.route");
const booksRoute = require("./src/routes/book.route");

//middlewares
app.use(express.json());
app.use(cors());


// Routes
app.use("/api/users", userRoutes);
app.use("/api/books", booksRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${PORT}`);
});