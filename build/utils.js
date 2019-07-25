const path = require('path')
// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const glob = require('glob')
// 页面模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
const MOUDLES_PATH = path.resolve(__dirname, '../src/modules')
// 用于做相应的merge处理
const merge = require('webpack-merge')

const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const pageList = require('../src/modules/PageList')

/**
 * 读取文件列表
 * @param {String} fileType 文件类型. '/main.js'或者'/index.html'
 */
function getEntries(fileType = '/main.js') {
  let entryFiles
  if (pageList && pageList.length > 0) {
    let mainPath = glob.sync(MOUDLES_PATH)
    entryFiles = []
    pageList.forEach(page => {
      entryFiles.push(mainPath + '/' + page + fileType)
    })
  } else {
    entryFiles = glob.sync(MOUDLES_PATH + '/*' + fileType)
  }
  return entryFiles
  // let entryHtml = glob.sync(MOUDLES_PATH + '/*/index.html')
}

// 自定义函数
// 多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下main.js文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function() {
  // let entryFiles = glob.sync(MOUDLES_PATH + '/*/main.js')
  let entryFiles = getEntries('/main.js')
  let map = {}
  entryFiles.forEach(filePath => {
    let subPath = filePath.substring(0, filePath.lastIndexOf('/'))
    let filename = filePath.substring(
      subPath.lastIndexOf('/') + 1,
      filePath.lastIndexOf('/')
    )
    let arr = ['babel-polyfill', filePath]
    map[filename] = arr
  })
  return map
}

// dev单模块js编译加载
exports.devEntries = function(modulename) {
  let path = modulename || '*'
  let entryFiles = glob.sync(MOUDLES_PATH + `/${path}/main.js`)
  let map = {}
  entryFiles.forEach(filePath => {
    let subPath = filePath.substring(0, filePath.lastIndexOf('/'))
    let filename = filePath.substring(
      subPath.lastIndexOf('/') + 1,
      filePath.lastIndexOf('/')
    )
    let arr = ['babel-polyfill', filePath]
    map[filename] = arr
  })
  return map
}

// 多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的index.html后缀文件，然后放入数组中
exports.htmlPlugin = function() {
  // let entryHtml = glob.sync(MOUDLES_PATH + '/*/index.html')
  let entryHtml = getEntries('/index.html')
  let arr = []
  entryHtml.forEach(filePath => {
    let subPath = filePath.substring(0, filePath.lastIndexOf('/'))
    let filename = filePath.substring(
      subPath.lastIndexOf('/') + 1,
      filePath.lastIndexOf('/')
    )
    let conf = {
      // 模板来源
      template: filePath,
      // 文件名称
      filename: filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: [config.manifestName, config.vendorName, filename],
      inject: true
    }
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      })
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}
// dev单模块页面输出配置
exports.devHtmlPlugin = function(modulename) {
  let path = modulename || '*'
  let entryHtml = glob.sync(MOUDLES_PATH + `/${path}/index.html`)
  let arr = []
  entryHtml.forEach(filePath => {
    let subPath = filePath.substring(0, filePath.lastIndexOf('/'))
    let filename = filePath.substring(
      subPath.lastIndexOf('/') + 1,
      filePath.lastIndexOf('/')
    )
    let conf = {
      // 模板来源
      template: filePath,
      // 文件名称
      filename: filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: [config.manifestName, config.vendorName, filename],
      inject: true
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}

exports.assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      minimize: true
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }
  // 配置px2rem
  const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUnit: 75 // 设计稿宽度/10
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    // 单独对没有usePostCSS的loader添加px2remLoader
    // postcssLoader是指import导入的css文件
    // 只有vue文件中的css才会转换
    const loaders = options.usePostCSS
      ? [cssLoader, postcssLoader]
      : [cssLoader, px2remLoader]
    // 添加px2rem插件
    // loaders.push(px2remLoader)

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
