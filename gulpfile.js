"use strict";


var gulp = require('gulp');
var cleanCss = require("gulp-clean-css");
var concat = require("gulp-concat");
var connect = require("gulp-connect");
var less = require("gulp-less");
var open = require("gulp-open");

var babelify = require('babelify');
var browerify = require('browserify');//Bundles JS
var source = require('vinyl-source-stream');

var config = {
	rootUrl: 'http://localhost',
	port: 5000,
	paths: {
		html: "./src/*.html",
		js: "./src/scripts/*.js",
		less: "./src/less/*.less",
		//mainJs: './src/main.jsx',
		dist: "./dist"
	}
};

gulp.task('html', function() {
	return gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function() {
	return gulp.src(config.paths.js)
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());

});

gulp.task('less', function() {
	return gulp.src(config.paths.less)
		.pipe(less())
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload());

});

gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.rootUrl + ':' + config.port + '/'}));
});

gulp.task('connect', function() {
	connect.server ({
		root: ['dist'],
		port: config.port,
		base: config.rootUrl,
		livereload: true
	});
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
	gulp.watch(config.paths.less, ['less']);
});

/*
gulp.task('react', function() {
	browserify(config.paths.mainJS)


});

*/

gulp.task('default', ['html', 'js', 'less', 'open', 'watch']);













