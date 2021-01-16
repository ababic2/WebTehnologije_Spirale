const Sequelize = require('sequelize');

module.exports = function(sequelize,DataTypes){
    const StudentGrupa = sequelize.define('StudentGrupa',{

    },{
        freezeTableName:true
    });
    return StudentGrupa;
};