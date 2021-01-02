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
}

module.exports = {
    Aktivnost: Aktivnost
}