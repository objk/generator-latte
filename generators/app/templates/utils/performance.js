!(function() {
  handleAddListener('load', getTiming)

  function handleAddListener(type, fn) {
    if(window.addEventListener) {
      window.addEventListener(type, fn)
    } else {
      window.attachEvent('on' + type, fn)
    }
  }

  function showPaintTimings() {
    let obj = {}
    try {
      let performance = window.performance;
      let performanceEntries = performance.getEntriesByType('paint');
      performanceEntries.forEach( (performanceEntry, i, entries) => {
        obj[performanceEntry.name] = performanceEntry.startTime;
      });
    } catch (e) {
      console.log('Performance timing isn\'t supported.');
    }

    return obj
  }

  function getTiming() {
    try {
      var time = performance.timing;
      var timingObj = {};

      var loadTime = (time.loadEventEnd - time.loadEventStart) / 1000;

      if(loadTime < 0) {
        setTimeout(function() {
          getTiming();
        }, 200);
        return;
      }

      timingObj['重定向时间'] = (time.redirectEnd - time.redirectStart) / 1000;
      timingObj['DNS解析时间'] = (time.domainLookupEnd - time.domainLookupStart) / 1000;
      timingObj['TCP完成握手时间'] = (time.connectEnd - time.connectStart) / 1000;
      timingObj['HTTP请求响应完成时间'] = (time.responseEnd - time.requestStart) / 1000;
      timingObj['DOM开始加载前所花费时间'] = (time.responseEnd - time.navigationStart) / 1000;
      timingObj['DOM加载完成时间'] = (time.domComplete - time.domLoading) / 1000;
      timingObj['DOM结构解析完成时间'] = (time.domInteractive - time.domLoading) / 1000;
      timingObj['脚本加载时间'] = (time.domContentLoadedEventEnd - time.domContentLoadedEventStart) / 1000;
      timingObj['onload事件时间'] = (time.loadEventEnd - time.loadEventStart) / 1000;
      timingObj['页面完全加载时间'] = (timingObj['重定向时间'] + timingObj['DNS解析时间'] + timingObj['TCP完成握手时间'] + timingObj['HTTP请求响应完成时间'] + timingObj['DOM结构解析完成时间'] + timingObj['DOM加载完成时间']);

      let paintTimings = showPaintTimings()
      timingObj['首次渲染时间'] = paintTimings['first-paint']
      timingObj['首次内容渲染时间'] = paintTimings['first-contentful-paint']

      console.group('%c >>>>>>>>> PAGE PERFORMANCE TIMING <<<<<<<<<', 'background: #f7f7f7; color: #40407a')
      for(item in timingObj) {
        console.log('%c' + item + ": " + timingObj[item] + ' 毫秒(ms)', 'background: #f7f7f7; color: #30336b');
      }
      console.groupEnd('========= PAGE PERFORMANCE TIMING =========')
    } catch (e) {
      console.log('Performance timing isn\'t supported.');
    }
  }
})();

// https://zhuanlan.zhihu.com/p/30389490
// http://www.cnblogs.com/answercard/p/6108200.html
// https://github.com/dwqs/blog/issues/52
// https://www.zhihu.com/question/23212408
// http://imweb.io/topic/597f3cb01e8320bb61cf3aa8
// https://juejin.im/entry/58ba9cb5128fe100643da2cc
// https://jeffjade.com/2017/08/06/124-webpack-packge-optimization-for-volume/
// https://jeffjade.com/2017/08/12/125-webpack-package-optimization-for-speed/
// https://www.cnblogs.com/caizhenbo/p/7993533.html
