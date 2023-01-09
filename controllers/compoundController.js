const db = require("../models/connection");
const Compound = db.compound;
// const Op = db.Sequelize.Op;
const fs = require("fs");
const csv = require("fast-csv");

//pagination to retrive data from database 
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

//pagination method to send request to the browser
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: records } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, records, totalPages, currentPage };
};


//create records in bulk with csv file
async function createBulk(req,res){
    try {
        console.log(req.file);
        if (req.file == undefined) {
            return res.status(400).send("Please upload a CSV file!");
        }
        let compoundCsv = [];
        let path = __basedir + "/backend/files/" + req.file.filename;
        fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {throw error.message;})
        .on("data", (row) => {compoundCsv.push(row);})
        .on("end", () => {
        Compound.bulkCreate(compoundCsv)
            .then(() => {
                res.status(200).send({message:"Uploaded the file successfully: " + req.file.originalname});})
            .catch((error) => {
                res.status(500).send({message: "Fail to import data into database!",error: error.message});
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Could not upload the file: " + req.file.originalname,
        });
    }
}


//create single records 
async function create(req,res){
    try {
        const compound = {
            id: req.body.id,
            CompoundName: req.body.CompoundName,
            CompoundDescription: req.body.CompoundDescription,
            strImageSource: req.body.strImageSource,
            strImageAttribution: req.body.strImageAttribution,
            dataModified: new Date(),
          };
        const result = await Compound.create(compound);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message || "Some error occurred while creating the Compound."});
    }
}

//retrive all compound with pagination
async function getCompound(req,res){
    try {
        const page = req.query.page;
        const size = req.query.size;
        var condition =  null;
        const { limit, offset } = getPagination(page, size);
        const result = await Compound.findAndCountAll({ where: condition, limit, offset ,order: [['id', 'DESC']]});
        const response = getPagingData(result, page, limit);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message || "Some error occurred while retrieving tutorials."});
    }
}

// get compound details for specified id
async function getCompundById(req,res){
    try {
        const id = req.params.id;
        const result = await Compound.findByPk(id);
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({message: `Cannot find Compound with id=${id}.`});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error retrieving Compound"});
    }
}

// update compound for specified id
async function updateCompound(req,res){
    try {
        const id = req.params.id;
        const result = await Compound.update(req.body, {where: { id: id }});
        if (result) {
            res.send({message: "Compound was updated successfully."});
        } else {
            res.send({message: `Cannot update Compound with id=${id}. Maybe Compound was not found or req.body is empty!`});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error updating Compound"});
    }
}

// Delete a Compound with the specified id in the request
async function deleteCompound(req,res) {
    try {
        const id = req.params.id;
        const result = await Compound.destroy({where: { id: id }});
        if (result) {
            res.send({message: "Compound is deleted successfully!"});
        } else {
            res.send({message: `Cannot delete Compound with id=${id}. Maybe Compound was not found!`});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Could not delete Compound"});
    }
}

module.exports={createBulk,create, getCompound, getCompundById, updateCompound, deleteCompound};
