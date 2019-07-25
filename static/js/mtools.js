/*
 * 必须导入的一些工具方法，script标签导入，请放在api.js后面，防止拿不到配置
 * @Author: jun.fu
 * @Date: 2018-06-08 14:18:31
 * @Last Modified by: zhangtao.zhou
 * @Last Modified time: 2018-11-20 11:23:09
 */

/**
 * 重写console.log方法，根据window.logdebug判断是否打印
 */
// console.log = (function(oriLogFunc) {
//   return function(str) {
//     if (window.logdebug === false) {
//       return
//     }
//     // if (typeof str === 'object') str = JSON.stringify(str)
//     oriLogFunc.call(console, str)
//   }
// })(console.log)

/**
 *  根据设定的日志级别来判断可打印日志
 *  注：目前生产环境只打印error和warn,非生产环境全打开，请注意api.js中的isProd属性;需要调整请手动修改 asf.ConsolePlus.setLevel
 */
var asf
;(function(asf) {
  /**
   * 输出信息扩展类
   * @author sodaChen
   * Date:2017/2/15
   */
  var ConsolePlus = (function() {
    function ConsolePlus() {}
    ConsolePlus.init = function() {
      this.funList = []
      this.funPulsList = []
      this.emptyFun = function(message) {}
      // 存放原来的方法
      for (var i = 0; i < this.funNames.length; i++) {
        this.funList.push(console[this.funNames[i]])
      }
      // console.log(this.funList)
    }
    /**
     * 设置日志等级，所有大于等于这个日志级别的输出都可以正常输出，小于的则不能进行输出
     * @param level
     */
    ConsolePlus.setLevel = function(level) {
      this.init()
      if (level) this.$level = level
      this.openConsole()
    }
    /**
     * 设置输出模式
     * @param isPlusMode 是否为扩展模式
     */
    ConsolePlus.setConsoleMode = function(isPlusMode) {
      this.isPlusMode = isPlusMode
      if (isPlusMode) this.openConsolePlus()
      else this.openConsole()
    }
    /**
     * 打开日志
     */
    ConsolePlus.openConsole = function() {
      this.closeConsole()
      for (var i = this.$level; i < this.funNames.length; i++) {
        // 还原成最初的方法
        console[this.funNames[i]] = this.funList[i]
      }
    }
    /**
     * 关闭所有的日志输出
     */
    ConsolePlus.closeConsole = function() {
      // 设置回最初的方法
      for (var i = 0; i < this.funNames.length; i++) {
        // 定义个空方法屏蔽掉
        console[this.funNames[i]] = this.emptyFun
      }
    }

    /// //////////////日志级别////////////////
    /** 调试级别，trace函数路径 **/
    ConsolePlus.TRACE = 0
    /** debug日志级别 */
    ConsolePlus.DEBUG = 1
    /** 普通日志级别 **/
    ConsolePlus.LOG = 2
    /** 信息日志级别 **/
    ConsolePlus.INFO = 3
    /** 警告日志级别 **/
    ConsolePlus.WARN = 4
    /** 错误日志级别 **/
    ConsolePlus.ERROR = 5
    /** 默认是最初的日志级别，改变这个值。可以改变日志输出的结果 **/
    ConsolePlus.$level = ConsolePlus.LOG
    /** 需要屏蔽覆盖的方法名 **/
    ConsolePlus.funNames = ['trace', 'debug', 'log', 'info', 'warn', 'error']
    return ConsolePlus
  })()
  asf.ConsolePlus = ConsolePlus
})(asf || (asf = {}))

asf.ConsolePlus.setLevel(
  window.prodInApp === false ? asf.ConsolePlus.TRACE : asf.ConsolePlus.WARN
)
