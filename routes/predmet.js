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

}
module.exports = {
    Predmet: Predmet
}