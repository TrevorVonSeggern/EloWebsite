let client = './src/client/';
let server = './src/server/';
let clientApp = client + 'api/';
let report = './report/';
let root = './';
let specRunnerFile = 'specs.html';
let temp = './.tmp/';
let bower = {
	json: require('./../bower.json'),
	directory: './bower_components/',
	ignorePath: '../..'
};
let nodeModules = 'node_modules';

export let config = {
	// File paths

	// All typescript settings
	ts: {
		// all typescript that we want to vet
		allts: [
			'./src/**/*.ts',
		],
		clientts: [
			'./src/client/**/*.ts'
		],
		serverts: [
			'./main.ts',
			'./src/server/**/*.ts'
		]
		// output: '.tmp'
	},

	// all javascript that we want to vet
	alljs: [
		'./src/test-helpers/*.js',
		'./*.js'
	],
	build: './build/',
	client: client,
	css: client + '**/*.css',
	fonts: bower.directory + 'font-awesome/fonts/**/*.*',
	images: client + 'images/**/*.gif',
	index: 'index.html',
	// api js, with no specs
	js: [
		clientApp + '**/*.js',
		'!' + clientApp + '**/*.spec.js',
		'!' + clientApp + '**/*.ts'
	],
	less: client + './**/*.less',
	html: client + '**/*.html',
	root: root,
	server: server,
	source: 'src/',
	temp: temp,

	// browser sync
	browserReloadDelay: 300,

	/**
	 * Bower and NPM files
	 */
	bower: './bower.json',
	package: './package.json',


	// Node settings
	nodeServer: './main.js',
	defaultPort: '8001'
};
