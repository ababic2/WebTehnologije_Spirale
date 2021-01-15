const Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){
    const Dan = sequelize.define('Dan',{
        naziv: Sequelize.STRING
    },{
        freezeTableName:true
    });
    return Dan;
};