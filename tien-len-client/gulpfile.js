'use-strict';
const gulp = require('gulp');
const rigger = require('gulp-rigger');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const copy = require('gulp-copy');
const babel = require('gulp-babel');
var paths = {
  build: {
    html: 'www/',
    js: 'www/js',
    css: 'www/css',
    img: 'www/img'
  },
  src: {
    html: './src/*.html',
    js: './src/js/*.js',
    css: './src/css/*.scss',
    img: './src/img/*.png'
  },
  tmp: {
    html: '.tmp/',
    js: '.tmp/js',
    css: '.tmp/css'
  },
  dist: {
    html: 'dist/',
    js: 'dist/js',
    css: 'dist/css',
    img: 'dist/img'
  },
  watch: {
    baseDir: './dist'
  },
}

function html() {
  return gulp
    .src(paths.src.html)
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.dist.html))
    .pipe(browserSync.stream());
}

function javascript() {
  return gulp
    .src(paths.src.js)
    .pipe(babel())
    // .pipe(uglify())
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: paths.watch.baseDir,
    },
  });

  gulp.watch('src/*.html', html);
  gulp.watch('src/js/*.js', javascript);
  gulp.watch('src/css/*.scss', styles);
  gulp.watch('src/css/*.css', styles);
}


function styles() {
  return gulp
    .src(paths.src.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream());
}

function build_html() {
  return gulp
    .src(paths.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.build.html))
    .pipe(browserSync.stream());
}

function build_javascript() {
  return gulp
    .src(paths.src.js)
    .pipe(uglify())
    .pipe(gulp.dest(paths.build.js))
    .pipe(browserSync.stream());
}

function build_styles() {
  return gulp
    .src(paths.src.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.build.css))
    .pipe(browserSync.stream());
}

function image(done) {
  gulp.src(paths.src.img)
    .pipe(gulp.dest(paths.dist.img))
    .on('end', done);
}

function build_image(done) {
  gulp.src(paths.src.img)
    .pipe(gulp.dest(paths.build.img))
    .on('end', done);
}

function copy_cordova_js() {
  return gulp
    .src('src/cordova.js')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
}


gulp.task('img:build', function (done) {
  gulp.src(paths.src.img)
    .pipe(gulp.dest(paths.build.img))
    .on('end', done); // Sử dụng hàm callback done
});

gulp.task('default', gulp.parallel(html, javascript, styles, image, copy_cordova_js));
gulp.task('watch', gulp.parallel(html, javascript, styles, image, copy_cordova_js, watch));
gulp.task('make', gulp.parallel(build_html, build_javascript, build_styles, build_image));