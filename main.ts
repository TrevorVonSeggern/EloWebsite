import {logs} from "./src/server/logs";
let process = require('process');
let fs = require('fs');
let express = require('express');
let helmet = require('helmet');
let env = process.env.NODE_ENV || 'dev';

import {app} from './src/server/app';

let server = express();
server.use(helmet({hidePoweredBy: false}));
server.use(function (req, res, next) {
	res.header("X-Powered-By", "Blood, sweat, and tears!");
	next()
});

const pkg = JSON.parse(fs.readFileSync('./package.json'));

let port = 3000;
if (process.env.PORT)
	port = process.env.PORT;
else if (pkg && pkg.userConfiguration && pkg.userConfiguration.preferredPort)
	port = pkg.userConfiguration.preferredPort;

if (app) {
	server.use(app);
}

server.listen(port); // http on port 3000

// start elo processor
import {processor} from './src/processor/processor';
let pro = new processor();
logs('processing elo. Checking every ' + pro.checkFrequency + ' seconds');
