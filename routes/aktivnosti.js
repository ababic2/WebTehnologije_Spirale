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

module.exports = router;
