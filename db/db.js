const Sequelize = require('sequelize');
const sequelize = new Sequelize("wt2018492","root","root",
    {host:'127.0.0.1',dialect:'mysql',logging:false});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Aktivnost = sequelize.import(__dirname+'/../models/Aktivnost.js');
db.Dan = sequelize.import(__dirname+'/../models/Dan.js');
db.Grupa = sequelize.import(__dirname+'/../models/Grupa.js');
db.Predmet = sequelize.import(__dirname+'/../models/Predmet.js');
db.Student = sequelize.import(__dirname+'/../models/Student.js');
db.Tip = sequelize.import(__dirname+'/../models/Tip.js');

// Predmet 1-N Grupa
db.Predmet.hasMany(db.Grupa, {foreignKey:'predmet'})
db.Grupa.belongsTo(db.Predmet, {foreignKey:'predmet'})

//Aktivnost N-1 Predmet or Predmet 1-N Aktivnost
db.Predmet.hasMany(db.Aktivnost, {foreignKey:'predmet'})
db.Aktivnost.belongsTo(db.Predmet, {foreignKey:'predmet'})

//Aktivnost N-1 Tip   or Tip 1-N Aktivnost
db.Tip.hasMany(db.Aktivnost, {foreignKey:'tip'})
db.Aktivnost.belongsTo(db.Tip, {foreignKey:'tip'})

//Student N-M Grupa
db.Student.belongsToMany(db.Grupa, { through: 'StudentGrupa' });
db.Grupa.belongsToMany(db.Student, { through: 'StudentGrupa' });

module.exports = db;