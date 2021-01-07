// {naziv:string,tip:string,pocetak:number,kraj:number,dan:string}
const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
let activity = require('./activity');
let Aktivnost = activity.Aktivnost;

router.get('/', (req, res) => {
    let akt = new Aktivnost();
    let result = akt.readActivitiesFromFile();
    res.send(JSON.stringify(result));
});

router.post('/',function(req,res){
    let tijelo = req.body;
    let novaLinija = tijelo['naziv'] + "," + tijelo['tip'] + ","+
                    tijelo['pocetak'] + "," + tijelo['kraj'] + "," + tijelo['dan'] + "\n";

    let akt = new Aktivnost(tijelo['naziv'], tijelo['tip'], tijelo['pocetak'], tijelo['kraj'], tijelo['dan']);
    if(akt.timeValidation()) {
        fs.appendFile('aktivnosti.txt', novaLinija, function (err) {
            if (err) throw err;
            res.json({message: "Uspješno dodana aktivnost!", data: novaLinija});
        });
    } else {
        res.json({message: "Aktivnost nije validna!", data: novaLinija});
    }
});

router.delete('/:id', (req, res) => {
    let idParameter = req.params.id;
    let akt = new Aktivnost();
    let result = akt.readActivitiesFromFile();

    let filtered = result.filter(element => element["naziv"] !== idParameter.toString() && element["naziv"]!=="\n");

    fs.unlink('aktivnosti.txt', (err) => {
        if (err) throw err;
    });

    function writeNewDataToFile(i) {
        let novaLinija = filtered[i]["naziv"] + "," + filtered[i]["tip"] + "," +
            filtered[i]["pocetak"] + "," + filtered[i]["kraj"] + "," + filtered[i]["dan"] + "\n";
        fs.appendFile('aktivnosti.txt', novaLinija, function (err) {
            if (err) throw err;
        });
    }

    for(let i = 0; i < filtered.length; i++) {
        writeNewDataToFile(i);
    }
    res.send(JSON.stringify(filtered));
});

module.exports = router;
