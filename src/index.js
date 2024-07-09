const { setBaseDir,  updateSidebar,  updateImagePath } = require('./docsify-helper')

function main() {
  setBaseDir();
  updateSidebar();
  updateImagePath();
}

// 执行 main 函数
main();