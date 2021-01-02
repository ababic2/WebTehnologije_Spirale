const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

function readFile() {
    let result = [];
    let data = fs.readFileSync('predmeti.txt', 'utf8');
    let splitted = data.toString().split("\n");
    console.log(splitted);
    return splitted;
}
router.get('/', (req, res) => {
    let splitted = readFile();
    res.send(JSON.stringify(splitted));
});

module.exports = router;
