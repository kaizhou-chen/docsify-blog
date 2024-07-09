const fs = require('fs')
const path = require('path')

const { separator, readFile, writeFile, getChildren, getRelativePath, getMarkdownList } = require("./file-utils");

let baseDir = 'D:\\workspace\\docsify-blog';

/**
 * 初始化菜单项
 */
function getItemList(item) {
  const list = [];
  if (item.name === 'Vite') {
    list.push('- [Vue 3 笔记](docs/Vue3/1.搭建项目/01.搭建项目 "Vue 3 笔记")\n');
    list.push('- [React 笔记](docs/React/1.搭建项目/0.搭建项目 "React 笔记")\n');
  } else {
    list.push('- [返回](docs/_get_start/ "返回")\n');
  }

  return list;
}

function setBaseDir() {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    baseDir = process.cwd()

    console.log('\n')
    console.log('baseDir  ', baseDir)
  }
}

function getDocsDir() {
  return path.join(baseDir, 'docs');
}

/**
 * 更新侧边栏
 */
function updateSidebar() {
  // 更新各个目录的侧边栏
  // _开头的目录除外，比如 _get_start
  const folders = getChildren(getDocsDir(), {
    check: (stats, name) => {
      return stats.isDirectory() && name.indexOf('_') !== 0
    }
  })

  const changeList = [];
  for (const item of folders) {
    const sidebar = path.join(item.path, '_sidebar.md')
    
    let text = '';
    try {
      text = readFile(sidebar)
    } catch(e) {
      console.log(item.path, '没有 _sidebar.md')
    }
    
    const content = getSidebar(item)
    if (text !== content) {
      writeFile(sidebar, content)
      changeList.push(item.path.replace(getDocsDir(), '').replace(/\\/g, '/'))
    }
  }

  console.log('\n')
  console.log(changeList.length === 0 ? '侧边栏没有变化' : '更新了如下侧边栏')
  console.log(changeList)
}

/**
 * 生成侧边栏
 */
function getSidebar(item) {
  const list = getItemList(item);

  let deep = 0;
  let options = {
    getDeep: () => deep,
    stepIn: () => deep++,
    stepOut: (list) => {
      deep--;
      if (deep === 0) {
        list.push('')
      }
    },
  }

  traverse(item, list, options)
  
  const sidebar = list.join('\n');
  return sidebar;
}

/**
 * 遍历目录下所有的子文件夹，及文件
 * 生成侧边栏的菜单项
 */
function traverse(folder, list, {getDeep, stepIn, stepOut}) {
  const folders = getChildren(folder.path)

  for (const item of folders) {
    const prefix = (new Array(getDeep())).fill('  ').join('');
    if (item.isDir) {
      const name = item.name.replace(/_/g, ' ').replace(/^\d*[.]/g, '')
      list.push(`${prefix}- ${name}`)

      stepIn()
      traverse(item, list, {getDeep, stepIn, stepOut});
    } else {
      if (getDeep() === 0) {
        continue;
      }

      const label = item.name.replace(/([.]md)/, '').replace(/_/g, ' ').replace(/^\d*[.]/g, '')
      const name = item.path.replace(/([.]md)/, '').replace(baseDir + separator, '').replace(/\\/g, '/')
      const link = `${prefix}- [${label}](${name} "${label}")`
      list.push(`${link}`)
    }
  }

  stepOut(list);
}



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
      changeList.push(item.path.replace(getDocsDir(), '').replace(/\\/g, '/'))
    }
  }

  console.log('\n')
  console.log(changeList.length === 0 ? '图片路径没有变化' : '更新了如下文件里的图片路径')
  console.log(changeList)
}

/**
 * 更新文件里的图片路径
 */
function getContent(file, text) {
  const relativePath = getRelativePath(file, baseDir);
  const replacer = (match) => {
    // 统一文件分隔符
    const image = match.replace(/\\/g, '/');
  
    // 将图片改成相对路径
    const pathRegex = new RegExp('[(](.*?)assets/images')
    const result = image.replace(pathRegex, '(' + relativePath + 'assets/images')
    return result;
  }

  // 找出 markdown 里所有的图片
  let regex = new RegExp('!\\[(.*?)\\]\\((.*?)\\)', 'g');
  let content = text.replace(regex, replacer);

  // 找出 markdown 里所有的 img 图片
  regex = new RegExp('<img(.*?)>', 'g')
  content = content.replace(regex, replacer)

  return content;
}

module.exports = {
  setBaseDir,
  updateSidebar,
  updateImagePath
}