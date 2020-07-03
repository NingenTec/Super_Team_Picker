const express = require("express"),
  path = require("path"),
  morgan = require("morgan"),
  { log } = console;

// Routes
const welcome = require("./routes/welcome");
const cohorts = require("./routes/cohorts");
// setup routes

const app = express();
app.set("view engine", "ejs");

// Middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// use routes here
app.use("/", welcome);
app.use('/cohorts', cohorts);

const DOMAIN = "localhost";
const PORT = 4545;
app.listen(PORT, DOMAIN, () =>
  log(`🙆‍♂️ Server listening on http://${DOMAIN}:${PORT}`)
);
