const express = require("express");
const cors = require("cors");

const projectRoutes = require("./routes/projectRoutes");
const logRoutes = require("./routes/logRoutes");

const notFoundMiddleware = require("./middleware/notFoundMiddleware");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api", projectRoutes);
app.use("/api", logRoutes);


// 404 handler
app.use(notFoundMiddleware);


// Error handler
app.use(errorMiddleware);


module.exports = app;