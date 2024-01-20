// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
const express = require('express');
const app = express();
const sys = require('util');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

//register body-parser to handle json from res / req
app.use( bodyParser.json() );

//register public dir to serve static files (html, css, js)
app.use( express.static( path.join(__dirname, "public") ) );

// END DO NOT CHANGE!
let rawdata = fs.readFileSync('data.json');
//formating
let data = JSON.parse(rawdata);


/**************************************************************************
****************************** Get request  ********************************
**************************************************************************/
app.get('/', (req ,res) => {
	res.sendFile(path.resolve("public/map.html"));
});

app.get('/alphabetic', (req ,res) => {
	res.sendFile(path.resolve("public/alph.html"));
});

app.get('/category', (req ,res) => {
	res.sendFile(path.resolve("public/category.html"));
});

app.get('/games', (req ,res) => {
	res.sendFile(path.resolve("public/games.html"));
});

app.get('/games/alone', (req ,res) => {
	res.sendFile(path.resolve("public/movement_tracking.html"));
});

app.get('/games/together', (req ,res) => {
	res.sendFile(path.resolve("public/projektor_games.html"));
});

app.get('/account', (req ,res) => {
	res.sendFile(path.resolve("public/account.html"));
});

/**************************************************************************
*************************** handle HTTP METHODS ***************************
**************************************************************************/
app.get('/data', (req ,res) => {
	res.send(data);
});


// DO NOT CHANGE!
// bind server localhost to port 3000
const port = 3000;
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
