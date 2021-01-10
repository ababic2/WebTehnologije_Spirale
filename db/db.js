const Sequelize = require("sequelize");
const sequelize = new Sequelize("vezeWT","root","root",{host:"127.0.0.1",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import modela
db.aktivnost = sequelize.import(__dirname+'./model/aktivnost.js');
db.dan = sequelize.import(__dirname+'./model/dan.js');
db.grupa = sequelize.import(__dirname+'./model/grupa.js');
db.predmet = sequelize.import(__dirname+'./model/predmet.js');
db.student = sequelize.import(__dirname+'./model/student.js');
db.tip = sequelize.import(__dirname+'./model/tip.js');

//relacije
//Predmet 1-N Grupa && belongsTo
db.predmet.hasMany(db.grupa,{as:'knjigeBiblioteke'});
db.grupa.belongsTo(db.predmet)

//Aktivnost N-1 Predmet
db.predmet.hasMany(db.aktivnost, {foreignKey:'predmet'});
db.aktivnost.belongsTo(db.predmet,{foreignKey:'predmet'});

//Aktivnost N-0 Grupa

//Aktivnost N-1 Dan
db.dan.hasMany(db.aktivnost, {foreignKey:'dan'});
db.aktivnost.belongsTo(db.dan,{foreignKey:'dan'});

//Aktivnost N-1 Tip
db.tip.hasMany(db.aktivnost, {foreignKey:'tip'});
db.aktivnost.belongsTo(db.tip,{foreignKey:'tip'});

// Veza n-m autor moze imati vise knjiga, a knjiga vise autora
db.autorKnjiga=db.knjiga.belongsToMany(db.autor,{as:'autori',through:'autor_knjiga',foreignKey:'knjigaId'});
db.autor.belongsToMany(db.knjiga,{as:'knjige',through:'autor_knjiga',foreignKey:'autorId'});


//Student N-M Grupa student vise gruoa i grupa vise studenata
db.junction = db.student.belongsToMany(db.grupa,{as:'grupe', through:'junction', foreignKey:'studentId'});
db.grupa.belongsToMany(db.student,{as:'studenti', through:'junction', foreignKey:'grupaId'});

module.exports=db;