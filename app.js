const mysqlDB = require("./db/mysqlDb");
const compound = require("./routes/routes");
const express = require("express");
const app = express();
const PORT = 8080;



var cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mysqlDB.createDB();
const db = require("./models/connection");
global.__basedir = __dirname + "/..";

db.sequelize.sync().then(() => {
    console.log("DataBase is Synced");
}).catch((err) => {
    console.log("Failed to Sync Database: " + err.message);
});


app.use("/api/compound",compound);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});