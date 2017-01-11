/**
 * Created by trevor on 7/6/2016.
 */
import {config} from './config';

let gulp = require('gulp');
let log = require('./_helper').log;

// Copy fonts
gulp.task('a_fonts', ['clean-fonts'], function () {
    log('Copying fonts');
    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

// Compress images
gulp.task('a_images', ['clean-images'], function () {
    log('Compressing and copying images');
    return gulp
        .src(config.images)
        //.pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'));
});