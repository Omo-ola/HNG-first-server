const express = require("express");
const requestIp = require("request-ip");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello HNG!! Yor server is running");
});
app.get("/api/hello", async (req, res) => {
  const visitor = req.query.visitor_name || "Guest";
  const clientIp = requestIp.getClientIp(req);
  res.send({
    client_ip: clientIp,
    location: "New York",
    greeting: `Hello, ${visitor}!, the temperature is 11 degrees Celcius in New York`,
  });
});

const port = process.env.PORT || 3000;
app.listen(port);

// http://localhost:3000/api/hello?visitor_name=%22Mark%22
