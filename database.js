var mysql = require('mysql');

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "zennit_rentolic"
})

module.exports = db; 