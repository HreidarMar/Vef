'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

// Inspect javascript files with jshint and report errors
gulp.task('inspect', function() {
	return gulp.src(['./**/*.js', '!node_modules/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});
