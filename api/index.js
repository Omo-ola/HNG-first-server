const express = require("express");
const requestIp = require("request-ip");
const app = express();
require("dotenv").config();

// const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_KEY = "f099db1e5ec440ff9d583044240307";

app.get("/", (req, res) => {
  res.send("Hello HNG!! Yor server is running");
});
app.get("/api/hello", async (req, res) => {
  const visitor = req.query.visitor_name.replace(/["']/g, "") || "Guest";
  const clientIp = requestIp.getClientIp(req);
  // const clientIp = "206.71.50.230";

  const locationResponse = await fetch(
    `http://api.weatherapi.com/v1/ip.json?key=${WEATHER_API_KEY}&q=${clientIp}`
  );
  const locationData = await locationResponse.json();
  const { lat, lon, city } = locationData;

  const weatherResponse = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}`
  );
  const weatherData = await weatherResponse.json();
  console.log(weatherData.current.temp_c);

  const responseData = {
    client_ip: clientIp,
    location: city,
    greeting: `Hello, ${visitor}!, the temperature is ${weatherData.current.temp_c} degrees Celsius in ${city}`,
  };

  res.setHeader("Content-Type", "application/json"); // Set Content-Type header
  res.send(responseData);
});

app.listen(8000, () => console.log("Server ready on port 8000."));

module.exports = app;
