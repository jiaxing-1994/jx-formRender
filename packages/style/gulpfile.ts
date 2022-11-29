const gulp = require("gulp");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
// const rename = require("gulp-rename");
const concat = require("gulp-concat");

// 要去掉重复bundle
function bulidLess() {
  debugger;
  return gulp
    .src("./src/index.less")
    .pipe(
      less({
        javascriptEnabled: true,
      })
    )
    .pipe(concat("index.css"))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("dist"));
}

exports.default = gulp.series(bulidLess);
