

const mysql = require("mysql")
const util = require("util")

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    // port : ,
    password : "",
    database : "creative_innovation_center"
})

//promise wrapper to enable async await with mysql

db.query = util.promisify(db.query).bind(db);


module.exports = db