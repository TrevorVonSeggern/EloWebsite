// require statements
import * as gulp from 'gulp';
import {config} from './gulp/config';

// List the available gulp tasks

// gulp.task('default', config.taskListing);
gulp.task('dev', ['d_serve-dev']);
gulp.task('production', ['d_serve-build']);

// Bump the version
gulp.task('bump', function () {
	let lazyLoader = require('gulp-load-plugins')({lazy: true});

	return gulp
		.src(config.package)
		.pipe(lazyLoader.bump())
		.pipe(gulp.dest(config.root));
});

let WebpackDevServer = require("webpack-dev-server");
let webpack = require("webpack");
let gutil = require("gulp-util");

gulp.task('serveDev', () => {
	let compiler = webpack({
		// configuration
	});

	new WebpackDevServer(compiler, {
		// server and middleware options
	}).listen(8080, "localhost", function (err) {
		if (err) throw new gutil.PluginError("webpack-dev-server", err);
		// Server listening
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

		// keep the server alive or continue?
		// callback();
	});
});


require('./gulp/dev.js');
require('./gulp/tsc.js');
require('./gulp/styles.js');
require('./gulp/assets.js');
require('./gulp/maintainence.js');

module.exports = gulp;
