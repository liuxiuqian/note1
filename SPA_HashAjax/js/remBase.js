
(function () {
  var t;
  function initHtmlFont(){
      var maxWidth = 640;
      var html = document.documentElement;
      var windowWidth = html.clientWidth;
      var windowWidth = html.clientWidth>maxWidth?maxWidth:html.clientWidth;
      
      html.style.fontSize=(windowWidth/750)*200+'px';
  }
  window.onresize = function(){
    clearTimeout(t);
    t = setTimeout(initHtmlFont,250);
  }
  document.addEventListener('DOMContentLoaded', function () {
    initHtmlFont();
  }, false);
})();
