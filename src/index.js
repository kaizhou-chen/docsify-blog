const { setBaseDir } = require('./docsify-utils/app')
const { updateSidebar } = require('./docsify-utils/update-sidebar')
const { updateImagePath } = require('./docsify-utils/update-image')

function main() {
  setBaseDir();
  updateSidebar();    // 自动生成侧边栏
  updateImagePath();  // 自动更新图片的相对地址
}

// 执行 main 函数
main();