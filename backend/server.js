require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

connectDB();

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "script-src": [
                    "'self'",
                    "https://unpkg.com"
                ]
            }
        }
    })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(require("path").join(__dirname, "..", "frontend")));

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Splendid Studio API is running."
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Splendid Studio API running on port ${PORT}`);
});
