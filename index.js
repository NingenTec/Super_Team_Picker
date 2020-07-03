const express = require("express"),
  path = require("path"),
  morgan = require("morgan"),
  { log } = console;

// Routes
// setup routes

const app = express();
app.set("view engine", "ejs");

// Middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// use routes here

const DOMAIN = "localhost";
const PORT = 4545;
app.listen(PORT, DOMAIN, () =>
  log(`🙆‍♂️ Server listening on http://${DOMAIN}:${PORT}`)
);
