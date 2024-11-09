require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const connectDB = require("./db");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

connectDB();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/", authRoutes);
app.use("/api/", quizRoutes);

require("./utils/socketServer")(io);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
