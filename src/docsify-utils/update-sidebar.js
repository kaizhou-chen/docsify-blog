const path = require('path')
const { getBaseDir, getDocsDir, getRelativePath } = require('./app')
const { separator, readFile, writeFile, getChildren } = require("./file-utils");

/** 侧边栏的文件名 */
const sidebarName = '_sidebar.md';

/**
 * 初始化菜单项
 */
function getItemList(item) {
  const list = [];
  if (item.name === 'Vite') {
    list.push('- [Vue 3 基础](docs/Vue3基础/1.搭建项目/01.搭建项目 "Vue 3 基础")\n');
    list.push('- [React 基础](docs/React/1.搭建项目/01.搭建项目 "React 基础")\n');
  } else {
    list.push('- [返回](docs/_get_start/ "返回")\n');
  }

  return list;
}

/**
 * 将文件名，转换为菜单上的显示名称
 */
function getLabel(name) {
  return name.replace(/_/g, ' ')      // 将下划线 _ 替换为空格
             .replace(/^\d*[.]/g, '') // 将开头的序号删除，比如：1.  01.
             .replace(/([.]md)$/, '') // 将结尾的 .md 后缀删除
}

/**
 * 将文件路径，转换为菜单上的链接地址
 */
function getHref(path) {
  const base = getBaseDir() + separator;
  return path.replace(base , '')      // 只保留相对路径
             .replace(/\\/g, '/')     // 将分隔符统一成 /
             .replace(/([.]md)/, '')  // 将结尾的 .md 后缀删除
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
    const sidebar = path.join(item.path, sidebarName)
    
    let text = '';
    try {
      text = readFile(sidebar)
    } catch(e) {
      console.log(item.path, '没有 ' + sidebarName)
    }
    
    const content = getSidebar(item)
    if (text !== content) {
      writeFile(sidebar, content)
      changeList.push(getRelativePath(item.path))
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
    const prefix = '  '.repeat(getDeep());

    if (item.isDir) {
      stepIn() // 进入下一层目录
      list.push(`${prefix}- ${getLabel(item.name)}`)
      traverse(item, list, {getDeep, stepIn, stepOut});
    } else {
      // 当前目录的深度
      if (getDeep() === 0) {
        continue;
      }

      const label = getLabel(item.name)
      const link = `${prefix}- [${label}](${getHref(item.path)} "${label}")`
      list.push(`${link}`)
    }
  }

  stepOut(list); // 返回上一层目录
}

module.exports = {
  updateSidebar,
}