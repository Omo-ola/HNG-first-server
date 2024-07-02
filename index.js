
const express = require("express");
const app = express();


// app.get("/", (req, res) => {});
app.get("/api/hello", async (req, res) => {
  const visitor = req.query.visitor_name || "Guest";

  res.json({
    client_ip: "127.0.0.1", // The IP address of the requester
    location: "New York", // The city of the requester
    greeting: `Hello, ${visitor}!, the temperature is 11 degrees Celcius in New York`,
  });
});

const port = process.env.PORT || 3000;
app.listen(port);

// http://localhost:3000/api/hello?visitor_name=%22Mark%22
