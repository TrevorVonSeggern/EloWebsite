/**
 * Created by trevor on 7/6/2016.
 */

let gulp = require('gulp');
import {config} from 'config';
let $ = require('gulp-load-plugins')({lazy: true});
let log = require('./_helper.js').log;

// Compile less to css
gulp.task('s_styles', ['m_clean-styles'], function () {
	log('Compiling Less --> CSS');
	return gulp.src(config.less)
		.pipe($.less())
		.pipe(gulp.dest(config.client));
});

// Watch LESS and recompile the CSS
gulp.task('s_less-watcher', function () {
	gulp.watch([config.less], ['s_styles']);
});

