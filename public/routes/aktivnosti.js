const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
let activity = require('./aktivnostClass');
let Aktivnost = activity.Aktivnost;



router.post('/',function(req,res){
    let tijelo = req.body;
    let novaLinija = tijelo['naziv'] + "," + tijelo['tip'] + ","+
                    tijelo['pocetak'] + "," + tijelo['kraj'] + "," + tijelo['dan'] + "\n";

    let akt = new Aktivnost(tijelo['naziv'], tijelo['tip'], tijelo['pocetak'], tijelo['kraj'], tijelo['dan']);
    if(akt.timeValidation()) {
        fs.appendFile('aktivnosti.txt', novaLinija, function (err) {
            if (err) throw err;
            res.set('application/json').json({message:"Uspješno dodana aktivnost!"});
        });
    } else {
        res.set('application/json').json({message:"Aktivnost nije validna!"});
    }
});

router.delete('/:id', (req, res) => {
    let idParameter = req.params.id;
    let akt = new Aktivnost();
    let result = akt.readActivitiesFromFile();

    let filtered = result.filter(element => element["naziv"] !== idParameter.toString() && element["naziv"]!=="\n");
    if(filtered.length === result.length) {
        res.json({message: "Greška - aktivnost nije obrisana!"});
    } else {
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

        for (let i = 0; i < filtered.length; i++) {
            writeNewDataToFile(i);
        }
        res.json({message:"Uspješno obrisana aktivnost!"});
    }
});

module.exports = router;
