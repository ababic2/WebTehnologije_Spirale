const Sequelize = require("sequelize");

const sequelize = new Sequelize("wt2018492","root","root",{host:"127.0.0.1",dialect:"mysql",logging:false});
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
const db={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import modela
db.aktivnost = sequelize.import(__dirname+'/model/aktivnost.js');
db.dan = sequelize.import(__dirname+'/model/dan.js');
db.grupa = sequelize.import(__dirname+'/model/grupa.js');
db.predmet = sequelize.import(__dirname+'/model/predmet.js');
db.student = sequelize.import(__dirname+'/model/student.js');
db.tip = sequelize.import(__dirname+'/model/tip.js');

//relacije
//Predmet 1-N Grupa && belongsTo
db.predmet.hasMany(db.grupa,{as:'grupe'});
db.grupa.belongsTo(db.predmet)

//Aktivnost N-1 Predmet
db.predmet.hasMany(db.aktivnost, {foreignKey:'predmetId'});
db.aktivnost.belongsTo(db.predmet,{foreignKey:'predmetId'});

//Aktivnost N-0 Grupa

//Aktivnost N-1 Dan
db.dan.hasMany(db.aktivnost, {foreignKey:'danId'});
db.aktivnost.belongsTo(db.dan,{foreignKey:'danId'});

//Aktivnost N-1 Tip
db.tip.hasMany(db.aktivnost, {foreignKey:'tipId'});
db.aktivnost.belongsTo(db.tip,{foreignKey:'tipId'});

//Student N-M Grupa student vise gruoa i grupa vise studenata
db.junction = db.student.belongsToMany(db.grupa,{as:'grupe', through:'junction', foreignKey:'studentId'});
db.grupa.belongsToMany(db.student,{as:'studenti', through:'junction', foreignKey:'grupaId'});

db.sequelize.sync({force:true});
module.exports = db;