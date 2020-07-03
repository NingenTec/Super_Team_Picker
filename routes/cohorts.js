const express = require("express");

const router = express.Router();
const knex = require("../db");

// ROUTES
// Index
router.get("/", (req, res) => {
  knex("cohorts")
    .orderBy("created_at", "DESC")
    .then((cohorts) => {
      res.render("cohorts/index", { cohorts });
    });
});
// Create

// New

// Show

module.exports = router;
