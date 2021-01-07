const express = require('express');
const path = require('path');
const fs = require('fs');

class Predmet {

    constructor(naziv){
        this.naziv = naziv;
    }
    get getNaziv() {
        return this.naziv;
    }
    readSubjects() {
        let result = [];
        let data = fs.readFileSync('predmeti.txt', 'utf8');
        let splitted = data.toString().split("\n");
        for (let i = 0; i < splitted.length; i++) {
            if(splitted[i] !== "") {
                let predmet = new Predmet(splitted[i]);
                result.push(predmet);
            }
        }
        return result;
    }

}
module.exports = {
    Predmet: Predmet
}