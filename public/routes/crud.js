const express = require('express');
const path = require('path');
const router = express.Router();
const aktivnostService =  require('./../../db/service/aktivnostService');
let activity = require('./aktivnostClass');
let Aktivnost = activity.Aktivnost;

const db = require('./../../db/db');

router.post('/aktivnost',function(req,res){
    let tijelo = req.body;

    let aktivnost = new Aktivnost(tijelo['naziv'], tijelo['tip'], tijelo['pocetak'], tijelo['kraj'], tijelo['dan']);
    if(aktivnost.timeValidation()) {
        let id = aktivnostService.create(aktivnost);
        res.set('application/json').json({message:"Uspješno dodana aktivnost!"});
    } else {
        res.set('application/json').json({message:"Aktivnost nije validna!"});
    }
});

router.get('/aktivnost', (req, res) => {
    let akt = new Aktivnost();
    let result = aktivnostService.findAll();
    console.log(result)
    res.json(result);
});

module.exports = router;
