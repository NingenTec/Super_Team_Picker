exports.up = (knex) =>
  knex.schema.createTable("cohorts", (table) => {
    table.increments("id");
    table.string("name");
    table.text("members");
    table.string("logoUrl");
    table.timestamps(false, true);
  });

exports.down = (knex) => knex.schema.dropTable("cohorts");
