// "use strict";
// Импорт пакетов
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const remane = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const newer = require('gulp-newer')
const imgmin = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')
const fileinclude = require('gulp-file-include')
const size = require('gulp-size')
const browsersync = require('browser-sync').create()
const del = require('del')
const { src } = require('gulp')


// Пути исходных файлов src и пути к результирующим файлам dest
const paths = {
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  style: {
    src: ['src/scss/**/*.sass', 'src/scss/**/*.scss'],
    dest: 'dist/css',
  },
  scripts: {
    src: 'src/js/**/*js',
    dest: 'dist/js',
  },
  images: {
    src: 'src/img/**',
    dest: 'dist/img',
  },
  fonts: {
    src: 'src/fonts/**',
    dest: 'dist/fonts'
  }

}

// Очистить каталог dist, удалить все кроме изображений
function clean() {
  return del(['dist/*', '!dist/img'])
}

// Обработка html 
function html() {
  return gulp.src(paths.html.src)
    .pipe(fileinclude({
      prefix: '@@',
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    // .pipe(size({
    //   showFiles: true
    // }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browsersync.stream())
}

// Обработка препроцессоров стилей
function styles() {
  return gulp.src(paths.style.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(remane({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    // .pipe(size({
    //   showFiles: true
    // }))
    .pipe(gulp.dest(paths.style.dest))
    .pipe(browsersync.stream())
}

//Обработка JS
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    // .pipe(size({ мне нужно
    //   showFiles: true
    // }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browsersync.stream())
}

// Сжатие изображений
function img() {
  return gulp.src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(imgmin({
      progressive: true,
    }))
    // .pipe(size({
    //   showFiles: true
    // }))
    .pipe(gulp.dest(paths.images.dest))
}

function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
}

// Отслеживание изменений в файлах и запуск лайв сервера
function watch() {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    }
  })
  gulp.watch(paths.html.dest).on('change', browsersync.reload)
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.style.src, styles)
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.images.src, img)
  gulp.watch(paths.fonts.src, fonts)
}

const build = gulp.series(clean, html, gulp.parallel(styles, scripts, img, fonts), watch)


exports.clean = clean
exports.img = img
exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.default = build 
