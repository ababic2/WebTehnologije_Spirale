const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    return sequelize.define("predmet", {
        naziv: Sequelize.STRING
    });
};
