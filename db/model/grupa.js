const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Grupa = sequelize.define("grupa",{
        naziv:Sequelize.STRING
    },
        {
            schema: "wt2018492",
            tableName: "grupa"
        },
        {freezeTableName:true})
    return Grupa;
};
