let bodyParser = require('body-parser'); // Use the body-parser package in our application
import fs = require('fs');
import process = require('process');
let express = require('express');
let helmet = require('helmet');

import {client} from "./server/client";
let env = process.env.NODE_ENV || 'dev';

let app = express();
app.use(helmet({hidePoweredBy: false}));
app.use(function (req, res, next) {
	res.header("X-Powered-By", "Blood, sweat, and tears!");
	next();
});

app.use(bodyParser.urlencoded({
	extended: true
}));

if (env === 'dev') {
	app.set('views', process.cwd());
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.get('/', (req, res, next) => res.render('index'));
}
app.use('/', client);


let port = 3000;
if (process.env.PORT)
	port = process.env.PORT;

// app.use('/api', api);

app.listen(port, () => console.log('listening on port: ' + port));

// start elo processor
// import {processor} from './src/processor/processor';
// let pro = new processor();
// logs('processing elo. Checking every ' + pro.checkFrequency + ' seconds');
