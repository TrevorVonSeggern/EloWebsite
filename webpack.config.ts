// Created by trevor on 1/31/17.
import webpack = require('webpack');
let path = require('path');

export = {
	entry: [
		'./client/app.js'
	],
	output: {
		publicPath: '/',
		path: __dirname,
		filename: 'bundle.js'
	},
	externals: {
		'angular': 'angular'
	},
	resolve: {
		modulesDirectories: ['node_modules', 'bower_components']
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(false),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	target: 'web',
	module: {}
};