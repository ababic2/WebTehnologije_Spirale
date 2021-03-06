const express = require('express');
const path = require('path');
const fs = require('fs');
let activity = require('./aktivnostClass');
let subject = require('./predmet');
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

let Aktivnost = activity.Aktivnost;
let Predmet = subject.Predmet;
let predmet = new Predmet();

router.get('/:id/aktivnost', (req, res) => {
    let idParameter = req.params.id;
    let result = new Aktivnost().findActivities(idParameter);
    if(result!==null)
        res.json(result);
    else res.json([]);
});

router.post('/',function(req,res){
    let tijelo = req.body;
    console.log(tijelo);
    let novaLinija = tijelo['naziv'] + "\n";
    let subjects = predmet.readSubjects();
    const found = subjects.find(element => element["naziv"] === tijelo['naziv']);
    if(found != null) {
        res.set('application/json').json({message:"Naziv predmeta postoji!"});
    }else{
        fs.appendFile('predmeti.txt', novaLinija, function (err) {
            if (err) throw err;
            res.set('application/json').json({message: "Uspješno dodan predmet!"});
        });
    }
});

router.delete('/:id', (req, res) => {
    let idParameter = req.params.id;
    let result = predmet.readSubjects();

    let filtered = result.filter(element => element["naziv"] !== idParameter.toString());
    if(filtered.length === result.length) {
        res.json({message: "Greška - predmet nije obrisan!"});
    } else {
        fs.writeFile('predmeti.txt', '', function(){console.log('done')})

        function writeNewDataToFile(i) {
            let novaLinija = filtered[i]["naziv"] + "\n";
            fs.appendFile('predmeti.txt', novaLinija, function (err) {
                if (err) throw err;
            });
        }

        for (let i = 0; i < filtered.length; i++) {
            writeNewDataToFile(i);
        }
        res.json({message:"Uspješno obrisan predmet!"});
    }
});

module.exports = router;
