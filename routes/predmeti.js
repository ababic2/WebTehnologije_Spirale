const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

let activity = require('./activity');
let Aktivnost = activity.Aktivnost;


function readSubjects() {
    let result = [];
    let data = fs.readFileSync('predmeti.txt', 'utf8');
    let splitted = data.toString().split("\n");
    console.log(splitted);
    return splitted;
}

function findActivities(subject) {

    let result = [];
    let data = fs.readFileSync('aktivnosti.txt', 'utf8');

    let splitted = data.toString().split("\n");
    for (let i = 0; i<splitted.length; i++) {
        let splitLine = splitted[i].split(",");
        if(splitLine[0] === subject) return new Aktivnost(splitLine[0], splitLine[1],splitLine[2], splitLine[3], splitLine[4]);
    }
    return null;
}

router.get('/', (req, res) => {
    let splitted = readSubjects();
    res.send(JSON.stringify(splitted));
});

router.get('/:id/aktivnost', (req, res) => {
    let idParameter = req.params.id;
    let result = findActivities(idParameter);
    res.send(JSON.stringify(result));
});

module.exports = router;
