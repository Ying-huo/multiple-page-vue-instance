var isCordovaReady = false;
var isAppPlatform = false;
if (isAppPlatform) {
  document.addEventListener("deviceready", function (e) {
    isCordovaReady = true;
  }, false);
} else {
  // 模拟一秒后deviceready
  setTimeout(function () {
    isCordovaReady = true;
  }, 1000);
}

// 判断cordova是否加载完成，供插件调用
function waitForDeviceReady(successCallback, failCallback) {
  if (isCordovaReady) {
    successCallback();
  } else {
    var startMill = new Date().getTime();
    setInterval(function () {
      if (isCordovaReady) {
        clearInterval(this);
        successCallback();
      }
      if (new Date().getTime() - startMill > 3000) {
        clearInterval(self.codetimer);
        failCallback();
      }
    }, 10);
  }
}

// 判断手机平台
function isAndroid() {
  var u = window.navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  return isAndroid;
}