import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    // Your socket.io logic here
  });

  app.all("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(3000, (err?: any) => {
    if (err) throw err;
    console.log("Listening on http://localhost:3000");
  });
});
