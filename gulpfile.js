const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const minifyCSS = require('gulp-clean-css');
const minifyImg = require('gulp-imagemin');
const minifyJS = require('gulp-uglify');
const minifyHTML = require('gulp-htmlmin');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const babel = require('gulp-babel');
const order = require('gulp-order');

gulp.task('browser-sync', () => {
   browserSync.init({
      server: {
         baseDir: 'dist',
      },
   });
});

gulp.task('css', () => {
   return gulp
      .src('src/assets/scss/**/*.scss')
      .pipe(
         sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.'],
         }).on('error', sass.logError)
      )
      .pipe(order([
         'main.scss',
         'lg/lightgallery.scss'
      ]))
      .pipe(autoprefixer())
      .pipe(minifyCSS())
      .pipe(concat('app.min.css'))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
});

gulp.task('js', () => {
   return gulp
      .src('src/assets/js/**/*.js')
      .pipe(
         babel({
            presets: ['@babel/preset-env'],
         })
      )
      .pipe(
         order([
            'lightgallery.min.js',
            'lg-fullscreen.min.js',
            'lg-autoplay.min.js',
            'lg-zoom.min.js',
            'lg-pager.min.js',
            'lg-thumbnail.min.js',
            'vanilla-tilt.min.js',
            'scrollreveal.js',
            'index.js',
         ])
      )
      .pipe(concat('app.min.js'))
      .pipe(minifyJS())
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.stream());
});

gulp.task('html', () => {
   return gulp
      .src('./src/*.html')
      .pipe(
         minifyHTML({
            collapseWhitespace: true,
         })
      )
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream());
});

gulp.task('img', () => {
   gulp.src([
      'src/images/**/*',
      'src/assets/scss/lg/img/*'
   ]).pipe(minifyImg()).pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function () {
   return gulp.src('src/assets/scss/lg/fonts/*')
      .pipe(gulp.dest('dist/fonts'));
});

gulp.task('delete', () =>
   del(['dist/css', 'dist/js', 'dist/img', 'dist/fonts', 'dist/**/*.html'])
);

gulp.task('watch', () => {
   gulp.watch('src/assets/scss/**/*.scss', gulp.series('css'));
   gulp.watch('src/assets/js/**/*.js', gulp.series('js'));
   gulp.watch(['src/images/**/*', 'src/assets/scss/lg/img/*'], gulp.series('img'));
   gulp.watch('src/assets/scss/lg/fonts/*', gulp.series('fonts'));
   gulp.watch('src/**/*.html', gulp.series('html'));
});

gulp.task(
   'default',
   gulp.series(
      'delete',
      gulp.parallel('html', 'css', 'js', 'img', 'fonts', 'browser-sync', 'watch')
   )
);
