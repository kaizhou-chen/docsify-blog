const { getBaseDir, getDocsDir, getRelativePath } = require('./app')
const { readFile, writeFile, diffPath, getMarkdownList } = require("./file-utils");

const baseDir = getBaseDir()

/**
 * 更新图片路径
 */
function updateImagePath() {
  const changeList = [];

  const list = getMarkdownList(getDocsDir());
  for (const item of list) {
    const file = item.path;
    const text = readFile(file);
    const content = getContent(file, text)

    // 如果内容不同，则更新文件
    if (text !== content) {
      writeFile(file, content)
      changeList.push(getRelativePath(item.path))
    }
  }

  console.log('\n')
  console.log(changeList.length === 0 ? '文件没有变化' : '更新了如下文件里的图片路径、制表符等')
  console.log(changeList)
}

/**
 * 更新文件里的图片路径
 */
function getContent(file, text) {
  const diff = diffPath(file, baseDir);
  const replacer = (match) => {
    // 统一文件分隔符
    const image = match.replace(/\\/g, '/');
  
    // 将图片改成相对路径
    const pathRegex = new RegExp('[(](.*?)assets/images')
    const result = image.replace(pathRegex, '(' + diff + 'assets/images')
    return result;
  }

  // 找出 markdown 里所有的图片
  let regex = new RegExp('!\\[(.*?)\\]\\((.*?)\\)', 'g');
  let content = text.replace(regex, replacer);

  // 找出 markdown 里所有的 img 图片
  regex = new RegExp('<img(.*?)>', 'g')
  content = content.replace(regex, replacer)

  // 制表符 tab 替换为 2 个空格
  regex = new RegExp('\t', 'g')
  content = content.replace(regex, '  ')

  return content;
}

module.exports = {
  updateImagePath,
}
