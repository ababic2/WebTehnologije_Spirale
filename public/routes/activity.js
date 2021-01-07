const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

class Aktivnost {
    constructor(naziv, tip, pocetak, kraj, dan) {
        this.naziv = naziv;
        this.tip = tip;
        this.pocetak = pocetak;
        this.kraj = kraj;
        this.dan = dan;
    }

    readActivitiesFromFile() {
        let result = [];
        let data = fs.readFileSync('aktivnosti.txt', 'utf8');

        let splitted = data.toString().split("\n");
        for (let i = 0; i<splitted.length; i++) { //dodala sam ovdje -1
            let splitLine = splitted[i].split(",");
            if(splitLine[0] !== "") {
                let aktivnost = new Aktivnost(splitLine[0], splitLine[1], splitLine[2], splitLine[3], splitLine[4]);
                result.push(aktivnost);
            }
        }
        return result;
    }

    findActivities(subject) {

        let result = [];
        let data = fs.readFileSync('aktivnosti.txt', 'utf8');

        let splitted = data.toString().split("\n");
        for (let i = 0; i<splitted.length; i++) {
            let splitLine = splitted[i].split(",");
            if(splitLine[0] === subject) return new Aktivnost(splitLine[0], splitLine[1],splitLine[2], splitLine[3], splitLine[4]);
        }
        return null;
    }

    timeValidation(){
        if ((this.pocetak > 0 && this.pocetak < 24) &&
            (this.kraj > 0 && this.kraj < 24) &&
            (this.kraj > this.pocetak) &&
            (Number.isInteger(this.pocetak) || ((this.pocetak * 10) % 10 === 5)) &&
            (Number.isInteger(this.kraj) || ((this.kraj * 10) % 10 === 5)))
            return true;
        else
            return false;
    }
}
module.exports = {
    Aktivnost: Aktivnost
}