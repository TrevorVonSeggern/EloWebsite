import * as express from 'express'
import * as fs from 'fs'

export let client = express.Router();

let compression = require('compression');
client.use(compression());

let cacheOptions = {
	etag: true,
};

client.use('/', express.static('./assets', cacheOptions));
client.use('/bower_components', express.static('./bower_components/', cacheOptions));
client.use('/node_modules', express.static('./node_modules/', cacheOptions));
client.use('/src/client', express.static('./src/client/', cacheOptions));
client.use('/src/models', express.static('./src/models/', cacheOptions));
client.use('/src/SystemConfig.js', express.static('./src/SystemConfig.js', cacheOptions));
client.use('/src/SystemConfig.ts', express.static('./src/SystemConfig.ts', cacheOptions));

client.get('/index.html', getIndex);
client.get('/', getIndex);

function getIndex(req, res) {
	let indexPage = fs.readFileSync('./src/client/index.html', 'utf8');
	res.send(indexPage);
}