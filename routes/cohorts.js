const express = require("express");

const router = express.Router();
const knex = require("../db");

// Team Assignments logic
const shuffle = (arr) => {
  const { floor, random } = Math;
  // Array.from clones the input array to avoid mutation
  return Array.from(arr).sort(() => [-1, 1][floor(random() * 2)]);
};

const assignTeams = (method, quantity, members) => {
  const teams = [];
  const shuffleMembers = shuffle(members);
  const max = members.length;
  const teamCount =
    method === "teamCount" ? quantity : Math.ceil(max / quantity);

  for (let i = 0; i < max; i += 1) {
    const id = i % teamCount;
    teams[id] = teams[id]
      ? teams[id].concat([shuffleMembers[i]])
      : [shuffleMembers[i]];
  }

  return teams;
};

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
router.get("/new", (req, res, next) => {
  res.render("cohorts/new");
});

// Show
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const { method, quantity } = req.query;

  knex("cohorts")
    .first()
    .where({ id })
    .then((cohort) => {
      let teams = [];
      if ([method, quantity, cohort.members].every((x) => !!x)) {
        const members = cohort.members.split(/,\s*/);
        teams = assignTeams(method, quantity, members);
      }

      res.render("cohorts/show", { cohort, teams, method, quantity });
    })
    .catch((err) => next(err));
});

module.exports = router;
