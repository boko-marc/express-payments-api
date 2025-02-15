require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./src/config/db");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
connectDB();

// Test route
app.get("/", (req, res) => {
    res.send("Payment API using paystack");
});

// Routes
const paymentRoute = require("./src/routes/paymentRoute");
app.use("/payments", paymentRoute);


// erreur cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
//Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
