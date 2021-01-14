const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    return sequelize.define("predmet", {
        naziv: Sequelize.STRING
    },
        {
            schema: "wt2018492",
            tableName: "predmet"
        },
        {freezeTableName:true});
};
