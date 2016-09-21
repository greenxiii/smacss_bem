'use strict';
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    path = require('path'),
    cssmin = require('gulp-cssmin'),
    notify = require('gulp-notify'),
    bs = require('browser-sync').create();

gulp.task('browser-sync', ['styles-minify'], function() {
    bs.init({
        server: {
            baseDir: "./"
        },
        open: false
    });
});

gulp.task('styles-compile', function() {
    return gulp.src('less/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('css'))
        .pipe(notify({ message: 'Styles-compile task complete' }));
});

gulp.task('styles-minify', ['styles-compile'], function() {
    gulp.src('css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('css/min'))
        .pipe(notify({ message: 'Styles-minify task complete' }));
});


gulp.task('build', ['styles-minify']);

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('less/*.less', ['styles-compile', bs.reload]);
  gulp.watch('*.html').on('change', bs.reload);
});
