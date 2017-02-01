let express = require('express');
let path = require('path');
import process = require('process')

import webpackConfig = require('../webpack.config');

export let client = new express();
let env = process.env.NODE_ENV || 'dev';

if (env === 'dev') {
	let webpack = require('webpack');
	let webpackDevMiddleware = require('webpack-dev-middleware');
	let webpackHotMiddleware = require('webpack-hot-middleware');

	client.set('views', process.cwd());
	client.engine('html', require('ejs').renderFile);
	client.set('view engine', 'html');
	client.get('/', (req, res, next) => res.render('index'));

	let compiler = webpack(webpackConfig);

	client.use(webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: {colors: true}
	}));
	client.use(webpackHotMiddleware(compiler, {
		log: console.log,
		noInfo: true,
		reload: true,
	}));

}
else {
	console.log('Production env');
}

client.use('/', express.static(process.cwd()));


