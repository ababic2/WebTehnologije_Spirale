const db = require('./db.js');
db.init = async () => {
    async function initialize(){
        await db.Aktivnost.create({naziv:"WT",pocetak:9.0,kraj:10.0})
        await db.Aktivnost.create({naziv:"RPR",pocetak:11.0,kraj:12.0})

        await db.Dan.create({naziv:"Ponedjeljak"})
        await db.Dan.create({naziv:"Utorak"})

        await db.Grupa.create({naziv:"GrupaA"})
        await db.Grupa.create({naziv:"GrupaB"})

        await db.Predmet.create({naziv:"RPR"})
        await db.Predmet.create({naziv:"RPR"})

        await db.Student.create({ime:"RPR", indeks:"18492"})
        await db.Student.create({ime:"RPR",indeks:"18499"})

        await db.Tip.create({naziv:"Predavanje"})
        await db.Tip.create({naziv:"Tutorijal"})

    };
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
    await db.sequelize.sync({force:'true'})
    await initialize();
}
module.exports = db;


