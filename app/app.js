const http = require("http");
const os = require("os");

const server = http.createServer((req, res) => {
  res.end("Hello from " + os.hostname());
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
