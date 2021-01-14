const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Student = sequelize.define("student",{
        ime:Sequelize.STRING,
        index:Sequelize.STRING
    },
        {
            schema: "wt2018492",
            tableName: "student"
        },
        {freezeTableName:true})
    return Student;
};