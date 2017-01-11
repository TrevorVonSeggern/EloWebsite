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

require('./gulp/dev.js');
require('./gulp/tsc.js');
require('./gulp/styles.js');
require('./gulp/assets.js');
require('./gulp/maintainence.js');

module.exports = gulp;
