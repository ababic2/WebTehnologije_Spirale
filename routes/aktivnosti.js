// {naziv:string,tip:string,pocetak:number,kraj:number,dan:string}
const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
let activity = require('./activity');
let Aktivnost = activity.Aktivnost;

function readFile(res) {
        let result = [];
    let data = fs.readFileSync('aktivnosti.txt', 'utf8');

    let splitted = data.toString().split("\n");
    for (let i = 0; i<splitted.length; i++) {
        let splitLine = splitted[i].split(",");

        let aktivnost = new Aktivnost(splitLine[0], splitLine[1],splitLine[2], splitLine[3], splitLine[4]);
        result.push(aktivnost);
    }
    console.log(result);
    return result;
}
router.get('/', (req, res) => {
    let result = readFile();
    res.send(JSON.stringify(result));
});

module.exports = router;
