/**
 * Created by trevor on 6/16/16.
 */
let process = require('process');
let https = require('https');
let fs = require('fs');
let express = require('express');
let compression = require('compression');

import {app} from './src/server/app';

const pkg = JSON.parse(fs.readFileSync('./package.json'));
let port = 3000;

if (process.env.PORT)
	port = process.env.PORT;
else if (pkg && pkg.userConfiguration && pkg.userConfiguration.preferredPort)
	port = pkg.userConfiguration.preferredPort;

let __dirname;
if (__dirname !== undefined)
	__dirname = process.cwd();

const server = express();

let helmet = require('helmet');
app.use(helmet({csp: true}));

if (app) {
	server.use(app);
} else {
	server.get('/', function (req, res) {
		res.send('Hello World!')
	});
}

server.listen(port); // http on port 3000
server.use(compression());
server.set('view cache', true);
