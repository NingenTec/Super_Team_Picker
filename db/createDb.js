const { execSync } = require("child_process");
const { log } = console;

const environment = process.env.NOD_ENV || "development";
// load knex configuration for environment
const knexConfig = require("../knexfile")[environment];

function isPgInstalled() {
  return /PstgreSQL/.test(execSync("psql --version").toString());
}

// execSync is a function that can excute shell commands
if (isPgInstalled()) {
  try {
    log(
      execSync(`createdb --echo ${knexConfig.connection.database}`).toString()
    );
  } catch (error) {
    // createdb error message is sufficient
    log(error);
  }
} else {
  log(`Please install PostgreSQL`);
}
