const http = require("node:http");
const { findAvailablePort } = require("./findAvailablePort.js");

require("dotenv").config();

const desiredPort = process.env.PORT ?? 3000;
const server = http.createServer((req, res) => {
  console.log("Request received", req.url);
  console.log("Rsponse sended", res.url);
  res.end("Hello, World!");
});

findAvailablePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
  });
});
