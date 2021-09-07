var gulp = require('gulp');
var consolidate = require('gulp-consolidate');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var sass = require('gulp-sass')(require('sass'));
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify-es').default;
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var babel = require('gulp-babel');
var presetEnv = require('@babel/preset-env');
var babelCore = require('@babel/core');
var gulpStylelint = require('gulp-stylelint');

//scss to css task
gulp.task('scss', function () {
  return gulp
    .src('src/scss/style.scss')
    .pipe(sass())
    .pipe(postcss([autoprefixer('last 2 versions')]))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('lint-scss', function lintCssTask() { 
  return gulp
    .src('src/**/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

// copy font
gulp.task('copy-fonts', () => {
  return gulp
    .src('src/fonts/*.{ttf,woff,woff2,eof}')
    .pipe(gulp.dest('dist/fonts'));
});

// copy images
gulp.task('copy-images', () => {
  return gulp.src('src/img/*.{jpg,png,svg}').pipe(gulp.dest('dist/img'));
});

// copy svg
gulp.task('copy-svg', () => {
  return gulp.src('src/svg/*.svg').pipe(gulp.dest('dist/svg'));
});

//compile js
gulp.task('compile:js', () =>
  gulp
    .src('src/js/*.js')
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
        plugins: ["@babel/plugin-proposal-class-properties"]
      })
    )
    .pipe(concat('main.js'))
    .pipe(uglify().on('error', console.error))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
);

//iconfont task
gulp.task('iconfont', function () {
  return gulp.src(['dist/svg/*.svg'])
      .pipe(iconfontCss({
        fontName: 'iconfont',
        cssClass: 'icon',
        path: 'src/iconfont-template/iconfont.scss',
        targetPath: '../../src/scss/icon-font/_iconfont.scss',
        fontPath: '../iconfont/'
      }))
      .pipe(iconfont({
        fontName: 'iconfont',
        prependUnicode: false,
        formats: ['ttf', 'woff'],
        normalize: true,
        centerHorizontally: true
      }))
      .on('glyphs', function(glyphs, options) {
        // CSS templating, e.g.
        console.log(glyphs, options);
    })
    .pipe(gulp.dest('dist/iconfont/'));
});

gulp.task(
  'default',
  gulp.series(
    'scss',
    'lint-scss',
    'copy-svg',
    'compile:js',
    'iconfont',
    'copy-fonts',
    'copy-images',
    function () {
      browserSync.init({ server: '.', port: 3030 });
      gulp.watch('src/**/*.scss', gulp.parallel('scss', 'lint-scss'));
      gulp.watch('index.html').on('change', browserSync.reload);
      gulp.watch('src/js/*.js').on('change', browserSync.reload);
    }
  )
);
