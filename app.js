const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const predmeti = require('./public/routes/predmeti');
const aktivnosti = require('./public/routes/aktivnosti');
const app = express();
let activity = require('./public/routes/aktivnostClass');

const db = require(__dirname+'/db/init.js');

let Aktivnost = activity.Aktivnost;

var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use('/v1/predmet', predmeti);
app.use('/v1/aktivnost', aktivnosti);
let subject = require('./public/routes/predmet');

let Predmet = subject.Predmet;
let predmet = new Predmet();

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

db.init().then(
    () => {
        console.log('Listening on port 3000 after database initialization...')
        app.listen(3000);
        app.emit('start');
    }
)

module.exports = app;


