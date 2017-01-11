/**
 * Created by trevor on 3/20/16.
 */
// var jsdom = require('jsdom');
// var beautify = require('js-beautify');
import * as express from 'express'
import * as benv from 'benv'
import * as fs from 'fs'

export let client = express();

benv.setup(function () {
	document.write(fs.readFileSync('./src/client/index.html'));
});

let cacheOptions = {
	etag: true,
	// maxage: '3h',
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

let indexPage = fs.readFileSync('./src/client/index.html', 'utf8');

function getIndex(req, res) {
	res.send(indexPage);
}