const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const predmeti = require('./routes/predmeti');
const aktivnosti = require('./routes/aktivnosti');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use('/predmeti',predmeti);
app.use('/aktivnosti', aktivnosti);

app.listen(3000);
