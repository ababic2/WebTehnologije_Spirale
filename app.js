const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const predmeti = require('./public/routes/predmeti');
const aktivnosti = require('./public/routes/aktivnosti');
const app = express();
let activity = require('./public/routes/activity');
let Aktivnost = activity.Aktivnost;

var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use('/predmet', predmeti);
app.use('/aktivnost', aktivnosti);
let subject = require('./public/routes/predmet');

let Predmet = subject.Predmet;
let predmet = new Predmet();

app.delete('/all', (req, res) => {
    fs.writeFile('predmeti.txt', '', function(){console.log('done')})

    fs.writeFile('aktivnosti.txt', '', function(){console.log('done')})
    res.set('application/json').send({message:"Uspješno obrisan sadržaj datoteka!"});

});
app.get('/predmeti', (req, res) => {
    let splitted = predmet.readSubjects();
    res.json(splitted);
});

app.get('/aktivnosti', (req, res) => {
    let akt = new Aktivnost();
    let result = akt.readActivitiesFromFile();
    res.json(result);
});

app.listen(3000);
