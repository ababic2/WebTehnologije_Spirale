const express = require('express');
const path = require('path');
const fs = require('fs');
let activity = require('./activity');
let subject = require('./predmet');
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

let Aktivnost = activity.Aktivnost;
let Predmet = subject.Predmet;

function readSubjects() {
    let result = [];
    let data = fs.readFileSync('predmeti.txt', 'utf8');
    let splitted = data.toString().split("\n");
    for (let i = 0; i < splitted.length; i++) {
        let predmet = new Predmet(splitted[i]);
        result.push(predmet);
    }
    return result;
}

router.get('/', (req, res) => {
    let splitted = readSubjects();
    res.send(JSON.stringify(splitted));
});

router.get('/:id/aktivnost', (req, res) => {
    let idParameter = req.params.id;
    let result = new Aktivnost().findActivities(idParameter);
    res.send(JSON.stringify(result));
});

router.post('/',function(req,res){
    let tijelo = req.body;
    console.log(tijelo);
    let novaLinija = "\n" + tijelo['naziv'];
    let subjects = readSubjects();
    const found = subjects.find(element => element["naziv"] === tijelo['naziv']);
    if(found != null) {
        res.json({message:"Naziv predmeta postoji!",data:novaLinija});
    }else{
        fs.appendFile('predmeti.txt', novaLinija, function (err) {
            if (err) throw err;
            res.json({message: "Uspješno dodan predmet!", data: novaLinija});
        });
    }
});



module.exports = router;
