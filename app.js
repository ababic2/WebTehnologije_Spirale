const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const predmeti = require('./public/routes/predmeti');
const aktivnosti = require('./public/routes/aktivnosti');
const crud = require('./public/routes/crud');
const app = express();
let activity = require('./public/routes/aktivnostClass');
let Aktivnost = activity.Aktivnost;

var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use('/v1/predmet', predmeti);
app.use('/v1/aktivnost', aktivnosti);
app.use('/v2', crud);
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

app.listen(3000);
