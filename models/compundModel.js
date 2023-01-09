function CompoundModel(sequelize, Sequelize){
    const Compound = sequelize.define("compoundtest", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        CompoundName: {
            type: Sequelize.STRING
        },
        CompounrDescription: {
            type: Sequelize.TEXT
        },
        strImageSource: {
            type: Sequelize.STRING
        },
        strImageAttribution: {
            type: Sequelize.TEXT
        },
        dateModified: {
            type: Sequelize.DATE
        }
    });

    return Compound;
}

module.exports = {CompoundModel};

  