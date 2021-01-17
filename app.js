const express     = require('express');
const path        = require('path');
const bodyParser  = require('body-parser');
const fs          = require('fs');
const predmeti    = require('./public/routes/predmeti');
const aktivnosti  = require('./public/routes/aktivnosti');
let activity      = require('./public/routes/aktivnostClass');
const db          = require(__dirname+'/db/init.js');
var cors          =  require('cors')

const app = express();
let Aktivnost = activity.Aktivnost;
let subject = require('./public/routes/predmet');
let Predmet = subject.Predmet;
let predmet = new Predmet();

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use('/v1/predmet', predmeti);
app.use('/v1/aktivnost', aktivnosti);

app.delete('/all', (req, res) => {
    fs.writeFile('predmeti.txt', '', function(){console.log('done')})

    fs.writeFile('aktivnosti.txt', '', function(){console.log('done')})
    res.set('application/json').send({message:"Uspješno obrisan sadržaj datoteka!"});

});
app.get('/v1/predmeti', (req, res) => {
    let splitted = predmet.readSubjects();
    res.json(splitted);
});
app.get('/v1/aktivnosti', (req, res) => {
    let akt = new Aktivnost();
    let result = akt.readActivitiesFromFile();
    res.json(result);
});

//                                      GET
app.get('/v2/aktivnost',(req,res) => {
    db.Aktivnost.findAll().then(
        (aktivnosti) => {
            aktivnosti.map(aktivnost => {
                return {
                    id:aktivnost.id,
                    naziv:aktivnost.naziv,
                    pocetak:aktivnost.pocetak,
                    kraj:aktivnost.kraj,
                    predmet:aktivnost.predmet,
                    dan:aktivnost.dan,
                    grupa:aktivnost.grupa,
                    tip:aktivnost.tip,
                }
            })
            res.json({
                aktivnosti:aktivnosti
            })
        }
    )
});
app.get('/v2/dan',(req,res) => {
    db.Dan.findAll().then(
        (dani) => {
            dani.map(dan => {
                return {
                    id:dan.id,
                    naziv:dan.naziv
                }
            })
            res.json({
                dani:dani
            })
        }
    )
});
app.get('/v2/grupa',(req,res) => {
    db.Grupa.findAll().then(
        (grupe) => {
            grupe.map(grupa => {
                return {
                    id:grupa.id,
                    naziv:grupa.naziv,
                    predmet: grupa.predmet
                }
            })
            res.json({
                grupe:grupe
            })
        }
    )
});
app.get('/v2/predmet',(req,res) => {
    db.Predmet.findAll().then(
        (predmeti) => {
            predmeti.map(predmet => {
                return {
                    id:predmet.id,
                    naziv:predmet.naziv
                }
            })
            res.json({
                predmeti:predmeti
            })
        }
    )
});
app.get('/v2/student',(req,res) => {
    db.Student.findAll().then(
        (studenti) => {
            studenti.map(student => {
                return {
                    id:student.id,
                    ime:student.ime,
                    indeks:student.indeks
                }
            })
            res.json({
                studenti:studenti
            })
        }
    )
});
app.get('/v2/tip',(req,res) => {
    db.Tip.findAll().then(
        (tipovi) => {
            tipovi.map(tip => {
                return {
                    id:tip.id,
                    naziv:tip.naziv,
                    pocetak:tip.pocetak,
                    kraj:tip.kraj
                }
            })
            res.json({
                tipovi:tipovi
            })
        }
    )
});

app.get('/v2/student/:id',async(req,res) => {
    let idParameter = req.params.id;

    let found = await db.Student.findOne({
        where: {
            indeks: idParameter
        }
    }).then((result) => {
        let a = {
            id: result.id,
            ime: result.ime,
            indeks: result.indeks
        }
        res.json({
            student: a
        });
    });
});
app.get('/v2/grupa/:id',async(req,res) => {
    let idParameter = req.params.id;

    let found = await db.Grupa.findOne({
        where: {
            naziv: idParameter
        }
    }).then((result) => {
        let a = {
            id: result.id,
            naziv: result.naziv,
            predmet: result.predmet
        }
        res.json({
            grupa: a
        });
    });
});
app.get('/v2/predmet/:id',async(req,res) => {
    let idParameter = req.params.id;

    let found = await db.Predmet.findOne({
        where: {
            id: idParameter
        }
    }).then((result) => {
        let a = {
            id: result.id,
            naziv: result.naziv
        }
        res.json({
            predmet: a
        });
    });
});
app.get('/v2/junction', (req,res) => {
    db.StudentGrupa.findAll().then(
        (tipovi) => {
            tipovi.map(tip => {
                return {
                    StudentId:tip.StudentId,
                   GrupaId:tip.GrupaId
                }
            })
            res.json({
                tipovi:tipovi
            })
        }
    )
});


//                                      POST
app.post('/v2/grupa',async (req,res)=> {
    let tijelo = req.body;
    if(await checkIfGroupAlreadyExist(tijelo['naziv'], tijelo['predmet'])) {
        res.json({message:"Grupa s datim nazivom već postoji!"})
    } else {
        let grupa = await db.Grupa.create(
            {
                naziv:tijelo['naziv'],
                predmet:tijelo['predmet']
            });
        res.json({message:"Grupa uspješno kreirana!"})
    }
});
async function checkIfGroupAlreadyExist(grupa, predmet) {
    let naziv = await db.Grupa.findOne({
        where:{
            naziv: grupa,
            predmet: predmet
        }
    });
    if(naziv !== null && naziv !== undefined)
        return true;
    return false;
}

app.post('/v2/dan',async (req,res)=> {
    let tijelo = req.body;
    if(await checkIfDayAlreadyExist(tijelo['naziv'])) {
        res.json({message:"Dan s datim nazivom već postoji!"})
    } else {
        let dan = await db.Dan.create(
            {
                naziv:tijelo['naziv']
            });
        res.json({message:"Dan uspješno kreiran!"})
    }
});
async function checkIfDayAlreadyExist(dan) {
    let naziv = await db.Dan.findOne({
        where:{
            naziv: dan
        }
    });
    if(naziv !== null && naziv !== undefined)
        return true;
    return false;
}

app.post('/v2/tip',async (req,res)=> {
    let tijelo = req.body;
    if(await checkIfTypeAlreadyExist(tijelo['naziv'])) {
        res.json({message:"Tip s datim nazivom već postoji!"})
    } else {
        let dan = await db.Tip.create(
            {
                naziv:tijelo['naziv']
            });
        res.json({message:"Tip uspješno kreiran!"})
    }
});
async function checkIfTypeAlreadyExist(tip) {
    let naziv = await db.Tip.findOne({
        where:{
            naziv: tip
        }
    });
    if(naziv !== null && naziv !== undefined)
        return true;
    return false;
}

app.post('/v2/predmet',async (req,res)=> {
    let tijelo = req.body;
    if(await checkIfSubjectAlreadyExist(tijelo['naziv'])) {
        res.json({message:"Predmet s datim nazivom već postoji!"})
    } else {
        let predmet = await db.Predmet.create(
            {
                naziv:tijelo['naziv']
            });
        res.json({message:"Predmet uspješno kreiran!"})
    }
});
async function checkIfSubjectAlreadyExist(subject) {
    let naziv = await db.Predmet.findOne({
        where:{
            naziv: subject
        }
    });
    if(naziv !== null && naziv !== undefined)
        return true;
    return false;
}

app.post('/v2/student',async (req,res)=> {
    let tijelo = req.body;
    let mess = await checkIfStudentAlreadyExist(tijelo['ime'],tijelo['indeks']);

    if(mess !== "") {
        res.json({message:mess})
    } else {
        let student = await db.Student.create(
            {
                ime:tijelo['ime'],
                indeks: tijelo['indeks']
            });
        res.json({message:"Student uspješno dodan!"})
    }
});
async function checkIfStudentAlreadyExist(naziv, indeks) {
    let index = await db.Student.findOne({
        where:{
            ime: naziv,
            indeks: indeks
        }
    });
    if(index !== null && index !== undefined)
        return "Student već postoji!";
    else {
        index = await db.Student.findOne({
            where:{
                indeks: indeks
            }
        });
        if (index !== null && index !== undefined)
            return "Student " + naziv + " nije kreiran jer postoji student " + index.ime + " sa istim indeksom " + indeks;
    }
    return "";
}

app.post('/v2/nizStudent/',async (req,res)=> {
    let mojNiz = req.body;
    let poruke = [];

    for(let i = 0; i < mojNiz.length; i++) {
        let mess = await checkIfStudentAlreadyExist(mojNiz[i]['ime'], mojNiz[i]['indeks']);
        if (mess !== "") {
            poruke.push(mess);
        } else {
            let student = await db.Student.create(
                {
                    ime: mojNiz[i]['ime'],
                    indeks: mojNiz[i]['indeks']
                });
            poruke.push("Student uspješno dodan!");
        }
    }
    let sviDodani = poruke.filter(s=> s === "Student uspješno dodan!");
    if(sviDodani.length === poruke.length) {
        sviDodani.splice(0, sviDodani.length);
        res.status(200).json({message: sviDodani});
    } else
        res.json({result: poruke});
});


function timeValid(pocetak, kraj) {
    if ((pocetak > 0 && pocetak < 24) &&
            (kraj > 0 && kraj < 24) &&
            (kraj > pocetak) && pocetak >= 8 && kraj <= 20)  return true;
    return false;
}

app.post('/v2/aktivnost',async (req,res)=> {
    let tijelo = req.body;
    if(await checkIfActivityAlreadyExist(tijelo)){
        res.json({message:"Aktivnost već postoji!"})
    } else {
        if(timeValid(tijelo['pocetak'], tijelo['kraj'])) {
            let aktivnost = await db.Aktivnost.create(
                {
                    naziv: tijelo['naziv'],
                    pocetak: tijelo['pocetak'],
                    kraj: tijelo['kraj'],
                    predmet: tijelo['predmet'],
                    dan: tijelo['dan'],
                    grupa: tijelo['grupa'],
                    tip: tijelo['tip']
                });
            res.json({message: "Aktivnost uspješno dodana!"})
        } else
            res.json({message: "Aktivnost nije validna!"});
    }
});
async function checkIfActivityAlreadyExist(tijelo){
    let akt = await db.Aktivnost.findOne({
        where:{
            naziv: tijelo['naziv'],
            pocetak: tijelo['pocetak'],
            kraj: tijelo['kraj']
        }
    });
    if(akt !== null && akt !== undefined)
        return true;
    return false;
}

app.post('/v2/junction/:id/:name',async (req,res)=> {
    let aktivnost = await db.StudentGrupa.create(
        {
            StudentId: req.params.id,
            GrupaId: req.params.name
        });
        res.json({message:"Dodano u junction"})
});


//                                       DELETE
app.delete('/v2/dan',async(req,res)=> {
    let deleted = await db.Dan.destroy({
        where:{
            naziv: req.body['naziv']
        }
    });
    if(deleted === 1)
        res.json({message:"Dan uspješno obrisan!"})
    else
        res.json({message:"Dan nije ni bio upisan!"})
});
app.delete('/v2/grupa',async(req,res)=> {
    let deleted = await db.Grupa.destroy({
        where:{
            naziv: req.body['naziv']
        }
    });
    if(deleted === 1)
        res.json({message:"Grupa uspješno obrisana!"})
    else
        res.json({message:"Grupa nije ni bila upisana!"})
});

app.delete('/v2/grupa/:id',async(req,res)=> {
    let deleted = await db.Grupa.destroy({
        where:{
            naziv: req.body['naziv'],
            predmet: req.params.id
        }
    });
    if(deleted === 1)
        res.json({message:"Grupa uspješno obrisana!"})
    else
        res.json({message:"Grupa nije ni bila upisana!"})
});



app.delete('/v2/predmet',async(req,res)=> {
    let deleted = await db.Predmet.destroy({
        where:{
            naziv: req.body['naziv']
        }
    });
    if(deleted === 1)
        res.json({message:"Predmet uspješno obrisan!"})
    else
        res.json({message:"Predmet nije ni bio upisan!"})
});

app.delete('/v2/predmet/:id',async(req,res)=> {
    let deleted = await db.Predmet.destroy({
        where:{
            id: req.params.id,
            naziv: req.body['naziv']
        }
    });
    if(deleted === 1)
        res.json({message:"Predmet uspješno obrisan!"})
    else
        res.json({message:"Predmet nije ni bio upisan!"})
});

app.delete('/v2/tip',async(req,res)=> {
    let deleted = await db.Tip.destroy({
        where:{
            naziv: req.body['naziv']
        }
    });
    if(deleted === 1)
        res.json({message:"Tip uspješno obrisan!"})
    else
        res.json({message:"Tip nije ni bio upisan!"})
});
app.delete('/v2/student',async(req,res)=> {
    let deleted = await db.Student.destroy({
        where:{
            ime: req.body['ime'],
            indeks: req.body['indeks']
        }
    });
    if(deleted === 1)
        res.json({message:"Student uspješno obrisan!"})
    else
        res.json({message:"Student nije ni bio upisan!"})
});
app.delete('/v2/aktivnost',async(req,res)=> {
    let tijelo = req.body;
    let deleted = await db.Aktivnost.destroy({
        where:{
            where:{
                naziv: tijelo['naziv'],
                pocetak: tijelo['pocetak'],
                kraj: tijelo['kraj']
            }
        }
    });
    if(deleted === 1)
        res.json({message:"Aktivnost uspješno obrisana!"})
    else
        res.json({message:"Aktivnost nije ni bila upisana!"})
});

//                                        PUT
app.put('/v2/dan/:id',async(req,res)=> {
    let naziv = await db.Dan.findOne({
        where:{
            id: req.params.id
        }
    });
    if(naziv !== null && naziv !== undefined) {
        await db.Dan.update(
            {naziv: req.body['naziv']},
            {where: {id: req.params.id}}
        )
        res.json({message: "Successful update!"})
    } else {
        res.json({message: "Update failed!"})
    }
});
app.put('/v2/grupa/:id',async(req,res)=> {
    let naziv = await db.Grupa.findOne({
        where:{
            id: req.params.id
        }
    });
    if(naziv !== null && naziv !== undefined) {
        await db.Grupa.update(
            {naziv: req.body['naziv']},
            {where: {id: req.params.id}}
        )
        res.json({message: "Successful update!"})
    } else {
        res.json({message: "Update failed!"})
    }
});
app.put('/v2/predmet/:id',async(req,res)=> {
    let naziv = await db.Predmet.findOne({
        where:{
            id: req.params.id
        }
    });
    if(naziv !== null && naziv !== undefined) {
        await db.Predmet.update(
            {naziv: req.body['naziv']},
            {where: {id: req.params.id}}
        )
        res.json({message: "Successful update!"})
    } else {
        res.json({message: "Update failed!"})
    }
});
app.put('/v2/tip/:id',async(req,res)=> {
    let naziv = await db.Tip.findOne({
        where:{
            id: req.params.id
        }
    });
    if(naziv !== null && naziv !== undefined) {
        await db.Tip.update(
            {naziv: req.body['naziv']},
            {where: {id: req.params.id}}
        )
        res.json({message: "Successful update!"})
    } else {
        res.json({message: "Update failed!"})
    }
});
app.put('/v2/student/:id',async(req,res)=> {
    let naziv = await db.Student.findOne({
        where:{
            id: req.params.id
        }
    });
    if(naziv !== null && naziv !== undefined) {
        await db.Student.update(
            {ime: req.body['ime'], indeks: req.body['indeks']},
            {where: {id: req.params.id}}
        )
        res.json({message: "Successful update!"})
    } else {
        res.json({message: "Update failed!"})
    }
});
app.put('/v2/aktivnost/:id',async(req,res)=> {
    let naziv = await db.Aktivnost.findOne({
        where:{
            id: req.params.id
        }
    });
    if(naziv !== null && naziv !== undefined) {
        await db.Aktivnost.update(
            {naziv: req.body['naziv'], pocetak:req.body['pocetak'], kraj:req.body['kraj']},
            {where: {id: req.params.id}}
        )
        res.json({message: "Successful update!"})
    } else {
        res.json({message: "Update failed!"})
    }
});

app.put('/v2/junction/:id/:name',async(req,res)=> {
        await db.StudentGrupa.update(
            {StudentId: req.body['StudentId'], GrupaId:req.body['GrupaId']},
            {where: {StudentId: req.params.id, GrupaId: req.params.name}}
        )
        res.json({message: "Successful update!"})
});

db.init().then(
    () => {
        console.log('Listening on port 3000 after database initialization...')
        app.listen(3000);
        app.emit('start');
    }
)

module.exports = app;


