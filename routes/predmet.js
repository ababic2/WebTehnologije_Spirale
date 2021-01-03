const express = require('express');
const path = require('path');
const fs = require('fs');

class Predmet {
    constructor(naziv){
        this.naziv = naziv;
    }
}
module.exports = {
    Predmet: Predmet
}