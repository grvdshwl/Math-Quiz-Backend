module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    // Listen for new question
    redisClient.subscribe("newQuestion");
    redisClient.on("message", (channel, message) => {
      if (channel === "newQuestion") {
        io.emit("newQuestion", JSON.parse(message));
      }
    });

    // Listen for winner announcement
    redisClient.subscribe("winner");
    redisClient.on("message", (channel, message) => {
      if (channel === "winner") {
        io.emit("winnerAnnouncement", message);
      }
    });

    // Listen for leaderboard update
    redisClient.subscribe("leaderboardUpdate");
    redisClient.on("message", (channel, message) => {
      if (channel === "leaderboardUpdate") {
        io.emit("leaderboardUpdate", JSON.parse(message));
      }
    });
  });
};
