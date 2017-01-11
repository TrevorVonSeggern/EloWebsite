/**
 * Created by trevor on 7/6/2016.
 */

let gulp = require('gulp');
import {config} from './config';
let lazy = require('gulp-load-plugins')({lazy: true});
let del = require('del');
let log = require('./_helper.js').log;
let path = require("path");
let systemConfig = require('../src/SystemConfig');
let __dirname: string;

gulp.task('m_build', function () {
	log('Building everything');

	let msg = {
		title: 'gulp build',
		subtitle: 'Deployed to the build folder',
		message: 'Running `gulp serve-build`'
	};
	del(config.temp);
	log(msg);
	notify(msg);
});


gulp.task('m_system-builder', function (done) {
	let Builder = require('systemjs-builder');

	// optional constructor options sets the baseURL and loads the configuration file
	let builder = new Builder();
	builder.config(systemConfig.config);
	builder.defaultJSExtensions = true;

	builder.bundle('src/client/app/app.js', 'build/outfile.js', {
		minify: true,
		sourceMaps: true,
		config: systemConfig.config
	});

});


// Remove all files from the build, temp, and reports folders
gulp.task('m_clean', function (done) {
	let delconfig = [].concat(config.build, config.temp);
	log('Cleaning: ' + lazy.util.colors.blue(delconfig));
	del(delconfig, done);
});

// Remove all fonts from the build folder
gulp.task('m_clean-fonts', function (done) {
	clean(config.build + 'fonts/**/*.*', done);
});

// Remove all images from the build folder
gulp.task('m_clean-images', function (done) {
	clean(config.build + 'images/**/*.*', done);
});

// Remove all styles from the build and temp folders
gulp.task('m_clean-styles', function (done) {
	let files = [].concat(
		config.temp + '**/*.css',
		config.build + 'styles/**/*.css'
	);
	clean(files, done);
});

// Remove all js and html from the build and temp folders
gulp.task('m_clean-code', function (done) {
	let files = [].concat(
		config.temp + '**/*.js',
		config.build + 'js/**/*.js',
		config.build + '**/*.html'
	);
	clean(files, done);
});


// Delete all files in a given path
function clean(path, done) {
	log('Cleaning: ' + lazy.util.colors.blue(path));
	del(path, done);
}

// Show OS level notification using node-notifier
function notify(options) {
	let notifier = require('node-notifier');
	let notifyOptions = {
		sound: 'Bottle',
		contentImage: path.join(__dirname, 'gulp.png'),
		icon: path.join(__dirname, 'gulp.png')
	};
	// _.assign(notifyOptions, options);
	notifier.notify(notifyOptions);
}