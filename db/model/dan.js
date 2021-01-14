const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Dan = sequelize.define("dan",{
        naziv:Sequelize.STRING
    },
        {
            schema: "wt2018492",
            tableName: "dan"
        },
        {freezeTableName:true})
    return Dan;
};
