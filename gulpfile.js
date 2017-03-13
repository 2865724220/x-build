
/*  工具基本库  */
const gulp = require('gulp')                    // 引入gulp基础库
const watch = require('gulp-watch')             // 监听
const rename = require("gulp-rename")           // 重命名
const package = require('./package.json')       // 引入package
const plumber = require('gulp-plumber');        // 防止编译错误报错终止监听
/*  css  */
const minifyCSS = require('gulp-minify-css')    // css压缩
const sass = require('gulp-ruby-sass')          // sass编译
/*  javascript  */
const uglify = require('gulp-uglify')           // JS代码压缩
const babel = require('gulp-babel')             // ES6转换（gulp-babel babel-preset-es2015）
/*  images  */
const imagemin = require('gulp-imagemin')       // 图片压缩

/*  dist输出路径  */
const DIST_PATH = 'dist'
/*  build输出路径  */
const BUILD_PATH = 'build'

/*  将html复制到dist目录  */
gulp.task('html', () => {
  gulp.src('./src/*.html')
    .pipe(gulp.dest(DIST_PATH))
})
/*  task:编译sass，并输出到dist/css目录下  */
gulp.task('sass', () => {
  return sass('src/css/app.scss')
    .pipe(plumber())
	  .on('error', function (err) {
      console.error('Error!', err.message)
    })
    .pipe(gulp.dest(DIST_PATH + '/css'))
})
/*  task:JavaScript通过babel转化es5，并输出到dist/js目录下  */
gulp.task('js', () => {
  gulp.src('./src/js/app.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(DIST_PATH + '/js'))
})
// 压缩图片
gulp.task('images', () => {
  gulp.src('src/images/*.{png,jpg,gif,ico,JPG,PNG,GIF,ICO}')
    .pipe(imagemin())
    .pipe(gulp.dest(DIST_PATH + '/images'))
})

// 自动监听
gulp.task('auto', () => {
    gulp.watch('src/*.html', ['html']),
    gulp.watch('src/js/*', ['js']),
    gulp.watch('src/js/components/*', ['js']),
    gulp.watch('src/css/*', ['sass']),
    gulp.watch('src/css/components/*', ['sass']),
    gulp.watch('src/images/*)', ['images'])
})

// 默认动作
gulp.task('default', ['js', 'sass', 'images', 'auto'])