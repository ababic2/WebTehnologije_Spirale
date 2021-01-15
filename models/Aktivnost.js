const Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){
    const Aktivnost = sequelize.define('Aktivnost',{
        aktivnost: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true },
        naziv: Sequelize.STRING,
        pocetak: Sequelize.FLOAT,
        kraj: Sequelize.FLOAT
    },{
        freezeTableName:true
    });
    return Aktivnost;
};