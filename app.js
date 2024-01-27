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

app.get('/solo', (req ,res) => {
	res.sendFile(path.resolve("public/solo.html"));
});

app.get('/non_solo', (req ,res) => {
	res.sendFile(path.resolve("public/non_solo.html"));
});

app.get('/alone', (req ,res) => {
	res.sendFile(path.resolve("public/movement_tracking.html"));
});

app.get('/together', (req ,res) => {
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

app.get('/:id1/:id2', (req ,res) => {
	res.sendFile(__dirname + "/public/group.html");
});

app.get('/:id1/:id2/d', (req ,res) => {
	let result = findGroups(data, req.params.id1, req.params.id2-1);
	if (typeof(result) != 'undefined'){
		res.status(200).send(result);
	} else {
		res.status(404).send('No such id ' + req.params.id1 + ' in database.');
	}
});

function findGroups(data, id1, id2) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id1) {
            return {
				name: data[i].name,
				location_name: data[i].location_name,
				adress: data[i].adress,
				group_name: data[i].groups[id2].group_name,
				tranier_name:  data[i].groups[id2].tranier_name,
				day:  data[i].groups[id2].day,
				time:  data[i].groups[id2].time,
				cost:  data[i].groups[id2].cost,
				img: data[i].photo_of_location
			}
        }
    }
}

// DO NOT CHANGE!
// bind server localhost to port 3000
const port = 3000;
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
