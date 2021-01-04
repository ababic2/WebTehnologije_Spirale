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
    console.log(tijelo);
    let novaLinija = "\n" + tijelo['naziv'] + "," + tijelo['tip'] + ","+
                    tijelo['pocetak'] + "," + tijelo['kraj'] + "," + tijelo['dan'];
    console.log(novaLinija);
    // Aktivnost akt = new Aktivnost(tijelo[]dfsdfsd)
    // if(!aktivnostValidna())
    //else
    fs.appendFile('aktivnosti.txt',novaLinija,function(err){
        if(err) throw err;
        res.json({message:"Uspješno dodana aktivnost!",data:novaLinija});
    });
});

module.exports = router;
