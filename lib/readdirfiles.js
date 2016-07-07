'use strict';

const co   = require('co');
const fs   = require('mz/fs');
const path = require('path');

module.exports = co.wrap(readDirFiles);

/**
 *
 * @param dir
 * @returns {*}
 */
function* getDirFilesStat(dir) {
  let files = yield fs.readdir(dir);

  return yield files.map((file) => {
    let filePath = path.join(dir, file);
    return {
      file,
      filePath,
      stat: fs.stat(filePath)
    };
  });
}

/**
 *
 * @param pathDir
 * @returns {Array}
 */
function* readDirFiles(dir, recursive = true, encoding) {

  let stats = yield* getDirFilesStat(dir);

  return yield stats.reduce((obj, item) => {

    if (item.stat.isFile()) {
      obj[item.file] = fs.readFile(item.filePath, encoding)
    } else if (recursive) {
      obj[item.file] = readDirFiles(item.filePath, recursive, encoding)
    }

    return obj;
  }, {});
}







