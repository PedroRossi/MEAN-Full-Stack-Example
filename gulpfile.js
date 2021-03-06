/**
 * Gulp starter file
 */
// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
   return gulp.src('public/js/**/*.js')
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
   return gulp.src('public/scss/**/*.scss')
       .pipe(sass())
       .pipe(gulp.dest('public/dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
   return gulp.src('public/js/**/*.js')
       .pipe(concat('index.js'))
       .pipe(gulp.dest('dist'))
        .pipe(rename('index.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
   gulp.watch('public/js/**/*.js', ['lint', 'scripts']);
   gulp.watch('public/scss/**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts']);
