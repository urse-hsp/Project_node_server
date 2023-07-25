// const gulp = require('gulp')
const { src, dest, series, watch, parallel } = require('gulp')
// dest:创建一个用于将 Vinyl 对象写入到文件系统的流。
// src:创建一个流，用于从文件系统读取 Vinyl 对象。

// npm install --save-dev gulp-uglify gulp-rename
const uglify = require('gulp-uglify') // 压缩混淆
const rename = require('gulp-rename') // 更改名字

// npm install --save-dev gulp-babel @babel/core @babel/preset-env
const babel = require('gulp-babel')
const csso = require('gulp-csso')
const imagemin = require('gulp-imagemin')
const htmlminify = require('gulp-html-minify')

const css = function () {
  return (
    src(['./css/*.css', './css/*min.css'])
      // .pipe(dest('sources/css/'))
      .pipe(csso())
      .pipe(dest('dist/css'))
  )
}

const Img = function () {
  return (
    src('./images/*')
      // .pipe(dest('sources/images/'))
      .pipe(imagemin())
      .pipe(dest('dist/images'))
  )
}
const html = function () {
  return (
    src('./*.html')
      // .pipe(dest('sources/'))
      .pipe(htmlminify())
      .pipe(dest('dist/'))
  )
}

const js = function () {
  return (
    src(['./js/*.js'])
      // .pipe(src('lib/*.js')) // 添加lib下的文件
      // .pipe(dest('sources/js')) // 第一次输出：吧源文件移到 sources/
      // 吧src下面的文件经过babel转义
      .pipe(
        babel({
          presets: ['@babel/env'],
        })
      )
      // 压缩js
      .pipe(uglify())
      // 吧源文件，改为 '.min.js' 移到到 dist
      // .pipe(rename({extname: '.min.js'}))
      .pipe(dest('dist/js'))
  )
}

const NoCompressJs = function () {
  return src(['./js/*.min.js']).pipe(dest('dist/js'))
}

function allocation() {
  watch(['./js/*.js', './css/*.css', './*.html'], { gnoreInitial: false }, series(css, Img, html, js, NoCompressJs))
}

// exports.default = allocation
// exports.default = series(clean, parallel(css,javascript))
exports.default = series(css, Img, html, js, NoCompressJs)
