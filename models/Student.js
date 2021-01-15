const Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){
    const Student = sequelize.define('Student',{
        ime: Sequelize.STRING,
        indeks: Sequelize.STRING
    },{
        freezeTableName:true
    });
    return Student;
};