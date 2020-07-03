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
router.post("/", (req, res) => {
  const { name, members, logoUrl } = req.body;

  knex
    .insert({ name, members, logoUrl })
    .into("cohorts")
    .returning("id")
    .then((id) => res.redirect(`/cohorts/${id}`));
});
// New
router.get("/new", (req, res) => {
  res.render("cohorts/new");
});
// Show

module.exports = router;
