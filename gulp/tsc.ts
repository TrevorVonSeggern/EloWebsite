/**
 * Created by trevor on 7/6/2016.
 */

import {config} from 'config';
let gulp = require('gulp');
let path = require('path');
let cp = require('child_process');
let process = require('process');

// set up the tsc watchers
gulp.task('tsc_watcher', function () {
	gulp.watch(config.ts.allts, ['tsc_build']);
});

// Compiles *.js files, sourcemaps,
gulp.task('tsc_build', function (done) {
	let tscjs = path.join(process.cwd(), 'node_modules/typescript/bin/tsc');
	let childProcess = cp.spawn('node', [tscjs, '-p', 'tsconfig.json'], {cwd: process.cwd()});
	childProcess.stdout.on('data', function (data) {
		// Ticino will read the output
		console.log(data.toString());
	});
	childProcess.stderr.on('data', function (data) {
		// Ticino will read the output
		console.log(data.toString());
	});
	childProcess.on('close', function () {
		done();
	});
});