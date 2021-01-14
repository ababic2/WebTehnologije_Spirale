const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Tip = sequelize.define("tip",{
        naziv:Sequelize.STRING
    },
        {
            schema: "wt2018492",
            tableName: "tip"
        },
        {freezeTableName:true})
    return Tip;
};
