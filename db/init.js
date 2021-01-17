const db = require('./db.js');
db.init = async () => {
    async function initialize(){
        await db.Aktivnost.create({naziv:"WT",pocetak:9.0,kraj:10.0})
        await db.Aktivnost.create({naziv:"RPR",pocetak:11.0,kraj:12.0})

        await db.Dan.create({naziv:"Ponedjeljak"})
        await db.Dan.create({naziv:"Utorak"})
        await db.Dan.create({naziv:"Srijeda"})
        await db.Dan.create({naziv:"Četvrtak"})
        await db.Dan.create({naziv:"Petak"})
        await db.Dan.create({naziv:"Subota"})
        await db.Dan.create({naziv:"Nedjelja"})

        await db.Grupa.create({naziv:"GrupaA", predmet:1})
        await db.Grupa.create({naziv:"GrupaA", predmet:2})
        await db.Grupa.create({naziv:"GrupaB",predmet:2})

        await db.Predmet.create({naziv:"RPR"})
        await db.Predmet.create({naziv:"RPR"})

        await db.Student.create({ime:"RPR", indeks:"18492"})
        await db.Student.create({ime:"RPR",indeks:"18499"})

        await db.Tip.create({naziv:"Predavanje"})
        await db.Tip.create({naziv:"Tutorijal"})
        await db.Tip.create({naziv:"Vjezbe"})

        await db.StudentGrupa.create({StudentId:1, GrupaId:1})
        await db.StudentGrupa.create({StudentId:2, GrupaId:2})

    };
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
    await db.sequelize.sync({force:'true'})
    await initialize();
}
module.exports = db;


