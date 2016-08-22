var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var compass = require('gulp-compass');
var path = require('path');
var useref = require('gulp-useref');
 
gulp.task('compass', function() {
  gulp.src('./app/styles/*.scss')
    .pipe(compass({
      project: path.join(__dirname, 'assets'),
      css: 'css',
      sass: 'sass'
    }))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('sass', function(){
  return gulp.src('./app/styles/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('templates', function() {
  return gulp.src('./app/lib/*jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('jade-watch', ['templates'], reload);

gulp.task('useref', function(){
  return gulp.src('./app/*.js')
    .pipe(useref())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('watch', ['browserSync', 'sass', 'templates', 'useref'], function (){
  gulp.watch('app/styles/**/*.scss', ['sass'])
  gulp.watch('./dist/*.html', browserSync.reload);
  gulp.watch('./dist/js/**/*.js', browserSync.reload);
  gulp.watch('./app/*.jade', ['jade-watch']);
});