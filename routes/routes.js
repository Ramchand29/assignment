const compound = require("./../controllers/compoundController");
const upload = require("./../middleware/csvUpload");
const express = require("express");
const route = express.Router();

route
// Bulk creation of Compound
.post("/bulk",upload.single('file'), compound.createBulk)
  
// Create a new Compound
.post("/", compound.create)
  
// getting all data with pagination
.get("/", compound.getCompound)
  
// Retrieve a single Compound with id
.get("/:id", compound.getCompundById)
  
// Update a Compound with id
.put("/:id", compound.updateCompound)
  
// Delete a Compound with id
.delete("/:id", compound.deleteCompound)
  

module.exports = route;