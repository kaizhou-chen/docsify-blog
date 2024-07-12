const path = require('path')

let baseDir = '';

function setBaseDir() {
  // 获取当前目录
  baseDir = process.cwd()

  console.log('\n')
  console.log('baseDir  ', baseDir)
}

function getBaseDir() {
  return baseDir
}

function getDocsDir() {
  return path.join(baseDir, 'docs');
}

function getRelativePath(path) {
  return path.replace(getDocsDir(), '').replace(/\\/g, '/')
}

module.exports = {
  setBaseDir,
  getBaseDir,
  getDocsDir,
  getRelativePath,
}