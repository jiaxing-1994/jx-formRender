const fs = require("fs");
const path = require("path");

console.log(process.env.VITE_FORMENGINE_BASE_URL);

const replaceFile = (filePath) => {
  // eslint-disable-next-line consistent-return
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return err;
    }

    let str = data.toString();
    console.log(filePath);

    str = str.replace(/VITE_FORMENGINE_BASE_URL_REPLACE/g, process.env.VITE_FORMENGINE_BASE_URL);

    // eslint-disable-next-line no-shadow,consistent-return
    fs.writeFile(filePath, str, "utf8", (err) => {
      if (err) return err;
      console.debug("替换成功", filePath);
    });
  });
};

function fileReplace(filePath) {
  fs.readdir(filePath, "utf8", (err, files) => {
    if (err) {
      console.debug(err);
    } else {
      files.forEach((filename) => {
        // 获取绝对路径
        const filedir = path.join(filePath, filename);
        const extname = path.extname(filename);

        fs.stat(filedir, (error, stats) => {
          if (error) {
            console.debug(error);
          } else {
            // 文件夹、文件的不同处理
            const isFile = stats.isFile();
            const isDir = stats.isDirectory();

            const fileExts = [".js", ".json"];
            if (isFile && fileExts.includes(extname) && filename !== "replace.js") {
              replaceFile(filedir);
            }

            if (isDir) {
              // 递归
              fileReplace(filedir);
            }
          }
        });
      });
    }
  });
}

const pathTarget = path.resolve("./");
fileReplace(pathTarget);
