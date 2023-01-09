
const dbConfig = require("../configs/configs.js");
const Sequelize = require("sequelize");
const mysqlDB = require("../db/mysqlDb");

(async function creat(){
  await mysqlDB.createDB();
})();

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

let {CompoundModel} = require("./compundModel.js");
db.compound = CompoundModel(sequelize, Sequelize);

module.exports = db;