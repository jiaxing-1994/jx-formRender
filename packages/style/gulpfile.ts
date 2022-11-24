const gulp = require("gulp");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
// const rename = require("gulp-rename");
const concat = require("gulp-concat");

// 要去掉重复bundle
function bulidLess() {
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

// 分别打包单独组件样式

exports.default = gulp.series(bulidLess);
