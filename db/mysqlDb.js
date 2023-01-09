const mysql = require("mysql2/promise");
const DBconfig = require("./../configs/configs");

async function createDB(){
  // Open the connection to MySQL server
  const connection = await mysql.createConnection({
    host: `${DBconfig.HOST}`,
    user: `${DBconfig.USER}`,
    password: `${DBconfig.PASSWORD}`,
  });

  // Run create database statement
  return await connection.query(`CREATE DATABASE IF NOT EXISTS ${DBconfig.DB}`);
}

module.exports={createDB};