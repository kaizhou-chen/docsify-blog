const fs = require('fs')
const path = require('path')

// 获取当前操作系统的路径分隔符
const separator = path.sep;

/** 读取文件 */
function readFile(filepath, encoding = 'utf-8') {
  return fs.readFileSync(filepath, encoding);
}

/** 写入文件 */
function writeFile(filepath, content, encoding = 'utf-8') {
  fs.writeFileSync(filepath, content, encoding)
}

/**
 * 遍历某个文件夹下所有的文件，包括所有的子文件夹下的文件
 * @returns 返回所有的文件名
 */
function getFileList(dir) {
  const list = [];

  const getFileInfo = function(dir, list) {
    const files = fs.readdirSync(dir);
    files.forEach(filename => {
      const filepath = path.join(dir, filename);
      const stats = fs.statSync(filepath);
      if (stats.isDirectory()) {
        getFileInfo(filepath, list);
      } else {
        const fileObj = {
          name: filename,
          path: filepath
        }

        list.push(fileObj);
      }
    });
  }

  getFileInfo(dir, list);
  return list;
}

/**
 * 获取所有的 markdown 文件
 */
function getMarkdownList(docs) {
  const list = getFileList(docs)
  const markdownList = list.filter(x => {
    const name = x.name;
    if (name.indexOf('.') >= 0) {
      const type = name.substring(name.lastIndexOf('.') + 1)
      return type.toLowerCase() === 'md'
    }

    return false;
  });

  return markdownList;
}

/**
 * 获取目录下的子文件夹、文件
 */
function getChildren(folder, options) {
  const children = [];

  const list = fs.readdirSync(folder);
  list.forEach(name => {
    const filepath = path.join(folder, name);
    const stats = fs.statSync(filepath);

    if (!options || options.check(stats, name)) {
      children.push({
        name,
        path: filepath,
        isFile: stats.isFile(),
        isDir: stats.isDirectory(),
      })
    }
  })

  return children;
}

/**
 * 根据文件的路径，计算出其与 baseDir 之间的相对路径
 * @param file 文件路径
 * @returns 相对路径，如 ../
 */
function getRelativePath(file, baseDir) {
  const folder = path.join(file, '../')
  const diff = path.relative(baseDir, folder)
  const len = diff.split(separator).length;
  const relativePath = (new Array(len)).fill('../').join('')
  return relativePath;
}

module.exports = {
  separator,

  readFile,
  writeFile,
  getChildren,
  getRelativePath,
  getMarkdownList,
}