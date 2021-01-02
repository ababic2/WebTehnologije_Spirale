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

router.get('/', (req, res) => {
    let splitted = readSubjects();
    res.send(JSON.stringify(splitted));
});

router.get('/:id/aktivnost', (req, res) => {
    let idParameter = req.params.id;
    let result = new Aktivnost().findActivities(idParameter);
    res.send(JSON.stringify(result));
});

module.exports = router;
