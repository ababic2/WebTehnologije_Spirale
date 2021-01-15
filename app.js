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
                    kraj:aktivnost.kraj
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
                    naziv:grupa.naziv
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

//                                      POST
app.post('/v2/grupa',async (req,res)=> {
    let tijelo = req.body;
    if(await checkIfGroupAlreadyExist(tijelo['naziv'])) {
        res.json({message:"Grupa s datim nazivom već postoji!"})
    } else {
        let grupa = await db.Grupa.create(
            {
                naziv:tijelo['naziv']
            });
        res.json({message:"Grupa uspješno kreirana!"})
    }
});
async function checkIfGroupAlreadyExist(grupa) {
    let naziv = await db.Grupa.findOne({
        where:{
            naziv: grupa
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
    if(await checkIfStudentAlreadyExist(tijelo['indeks'])){
        res.json({message:"Student već postoji!"})
    } else {
        let student = await db.Student.create(
            {
                ime:tijelo['ime'],
                indeks: tijelo['indeks']
            });
        res.json({message:"Student uspješno dodan!"})
    }
});
async function checkIfStudentAlreadyExist(indeks) {
    let index = await db.Student.findOne({
        where:{
            indeks: indeks
        }
    });
    if(index !== null && index !== undefined)
        return true;
    return false;
}

app.post('/v2/aktivnost',async (req,res)=> {
    let tijelo = req.body;
    if(await checkIfActivityAlreadyExist(tijelo)){
        res.json({message:"Aktivnost već postoji!"})
    } else {
        let aktivnost = await db.Aktivnost.create(
            {
                naziv: tijelo['naziv'],
                pocetak: tijelo['pocetak'],
                kraj: tijelo['kraj']
            });
        res.json({message:"Aktivnost uspješno dodana!"})
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
// Book.update(
//     {title: req.body.title},
//     {where: req.params.bookId}
// )
app.put('/v2/dan',async(req,res)=> {
    req.params.id;
    let deleted = await db.Dan.update({
        where:{             naziv: req.body['naziv']
        }
    });
    if(deleted === 1)
        res.json({message:"Dan uspješno obrisan!"})
    else
        res.json({message:"Dan nije ni bio upisan!"})
});

db.init().then(
    () => {
        console.log('Listening on port 3000 after database initialization...')
        app.listen(3000);
        app.emit('start');
    }
)

module.exports = app;


