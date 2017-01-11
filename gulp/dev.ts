/**
 * Created by trevor on 7/6/2016.
 */

let gulp = require('gulp');
let lazy = require('gulp-load-plugins')({lazy: true});
let del = require('del');
let browserSync = require('browser-sync');

let log = require('./_helper.js').log;
import {config} from './config';
let process: any = require('process');
let port = process.env.PORT || config.defaultPort;
let zip = require('gulp-zip');
let addsrc = require('gulp-add-src');

// serve the dev environment
gulp.task('d_serve-dev', ['s_less-watcher', 'tsc_build', 'tsc_watcher'], function () {
	serve(true);
});

// serve the build environment
gulp.task('d_serve-build', ['s_styles', 'tsc_build', 'm_build'], function () {
	serve(false);
});

gulp.task('browserSyncReload', browserSync.reload);

function serve(isDev) {
	let nodeOptions = {
		script: config.nodeServer,
		delayTime: 500,
		env: {
			'PORT': port,
			'NODE_ENV': 'build'
		},
		watch: [config.server]
	};

	return lazy.nodemon(nodeOptions)
		.on('restart', [], function (ev) {
			log('*** nodemon restarted');
			log('files changed:\n' + ev);
			if (isDev) {
				setTimeout(function () {
					browserSync.notify('reloading now ...');
					browserSync.reload({stream: false});
				}, config.browserReloadDelay);
			}
		})
		.on('start', function () {
			log('*** nodemon started');
			if (isDev)
				startBrowserSync();
		})
		.on('crash', function () {
			log('*** nodemon crashed: script crashed for some reason');
		})
		.on('exit', function () {
			log('*** nodemon exited cleanly');
		});
}

function startBrowserSync() {
	if (browserSync.active)
		return;

	log('Starting BrowserSync on port ' + port);

	// If build: watches the files, builds, and restarts browser-sync.
	gulp.watch([config.less, config.js, config.html], ['s_styles'])
		.on('change', function (event) {
			let srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
			log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
		});

	browserSync({
		proxy: 'localhost:' + port,
		port: 3000,
		files: [config.css, config.js, config.html],
		ghostMode: { // these are the defaults t,f,t,t
			clicks: true,
			location: false,
			forms: true,
			scroll: true
		},
		injectChanges: true,
		logFileChanges: true,
		logLevel: 'info',
		logPrefix: 'gulp-patterns',
		notify: true,
		reloadDelay: 500
	});
}

gulp.task('archive', function () {
	return gulp.src([
		'AuthData.json',
		'bower.json',
		'build.js',
		'gulpfile.js',
		'karma.conf.js',
		'main.js',
		'package.json',
		'tsconfig.json',
		'tsd.json',
		'tslint.json',
		'web.config',
		'yarn.lock'
	])
		.pipe(addsrc.append(['bower_components/**/*'], {base: './'}))
		.pipe(addsrc.append(['gulp/**/*', '!gulp/**/*.ts', '!gulp/**/*.js.map'], {base: './'}))
		.pipe(addsrc.append(['src/**/*', '!src/**/*.ts', '!src/**/*.js.map'], {base: './'}))
		.pipe(addsrc.append(['test/**/*', '!test/**/*.ts', '!test/**/*.js.map'], {base: './'}))
		.pipe(addsrc.append(['typings/**/*', '!typings/**/*.ts', '!typings/**/*.js.map'], {base: './'}))
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest('dist'));
});
