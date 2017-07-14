var GB = {
  /**
   * @description 过滤文本内容中含有的脚本等危险信息
   * @param {String} str 需要过滤的字符串
   * @author
   * @return {String}
   * @memberOf GB.Util
   */
  filterScript: function(str) {
    str = str || '';
    str = decodeURIComponent(str);//decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码
    str = str.replace(/<.*>/g, ''); // 过滤标签注入
    str = str.replace(/(java|vb|action)script/gi, ''); // 过滤脚本注入
    str = str.replace(/[\"\'][\s ]*([^=\"\'\s ]+[\s ]*=[\s ]*[\"\']?[^\"\']+[\"\']?)+/gi, ''); // 过滤HTML属性注入
    str = str.replace(/[\s ]/g, '&nbsp;'); // 替换空格
    return str;
  },
  /**
   * @description 获取地址栏参数（注意:该方法会经filterScript处理过）
   * @param {String} name 需要获取的参数如bc_tag
   * @param {String} url 缺省：window.location.href
   * @param {Number} num 当url存在多个？时，num设置取第几个？后面的参数  (add by free)
   * @author
   * @return {String}
   * @example
   GB.Util.getPara('bc_tag');

   当前地址:http://a.b.com/static/ssq/?bc_tag=70018.1.38
   返回值:70018.1.38
   * @memberOf GB.Util
   */
  getPara: function(name, url, num) {
    var para = (typeof url == 'undefined') ? window.location.search : url;
    para = para.split('?');
    if(!!num){
      para = (para[num]?para[num]:para[para.length-1]);
    }else{
      para = (typeof para[1] == 'undefined') ? para[0] : para[1];
    }
    para = para.split('&');
    for (var i = para.length-1; para[i]; i--) {
      para[i] = para[i].split('=');
      if (para[i][0] == name) {
        try { // 防止FF等decodeURIComponent异常
          return this.filterScript(para[i][1]);
        } catch (e) {}
      }
    }
    return '';
  },
  /**
   * @description 获取地址栏hash参数（注意:该方法会经filterScript处理过）
   * @param {String} name 需要获取的参数如bc_tag
   * @param {String} url 缺省：window.location.href
   * @author
   * @return {String}
   * @example
   GB.Util.getParaHash('bc_tag');

   当前地址:http://a.b.com/static/ssq/?bc_tag=70018.1.38
   返回值:70018.1.38
   * @memberOf GB.Util
   */
  getParaHash: function(name, url) {
    var para = (typeof url == 'undefined') ? window.location.href : url;
    para = para.split('#');

    para = (typeof para[1] == 'undefined') ? para[0] : para[1];
    para = para.split('&');
    for (var i = 0; para[i]; i++) {
      para[i] = para[i].split('=');
      if (para[i][0] == name) {
        try { // 防止FF等decodeURIComponent异常
          return this.filterScript(para[i][1]);
        } catch (e) {}
      }
    }
    return '';
  },  
  //本地存储
  Storage : {
    /**
     * @description 是否支持localStorage
     * @author 
     * @example GB.Storage.is();
     * @memberOf GB.Storage
     */
    is: function () {
      return !!window.localStorage;
    },
    /**
     * @description 设置localStorage
     * @author 
     * @param {String} name 名称
     * @param {String} value 值
     * @example GB.Storage.set('cp_pagetype', 'page');
     * @memberOf GB.Storage
     */
    set:function(name,value,type){
      switch($.type(value)){
        case 'object':
          value='object:'+JSON.stringify(value);//JSON.stringify(value)原来是对象的类型转换成字符串类型
          break;
        case 'string':
          value='string:'+value;
          break;
      }    
      var Storage = type?"sessionStorage":"localStorage";
      try {
        window[Storage].setItem(name, value);
      } catch (e) {
//    	Navigator 对象包含有关浏览器的信息，所有浏览器都支持该对象，userAgent返回由客户机发送服务器的 user-agent 头部的值。
//userAgent 属性是一个只读的字符串，声明了浏览器用于 HTTP 请求的用户代理头的值
        if ((navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1))confirm('为了正常运行网站，请关闭Safari浏览器-秘密（无痕）浏览')
      }
    },
    get:function(name,type){    
      var value;     
      var Storage = type?"sessionStorage":"localStorage";
      value = window[Storage].getItem(name);        
      if(/^object:/.test(value)){//test() 方法用于检测一个字符串是否匹配某个模式.
        value = JSON.parse(value.replace(/^object\:/,''));
        //JSON.parse  将 JavaScript 对象表示法 (JSON) 字符串转换为对象
      }else if(/^string:/.test(value)){
        value = value.replace(/^string\:/,'');
      }
      return value;
    },
    remove:function(name,type){      
      var Storage = type?"sessionStorage":"localStorage";
      window[Storage].removeItem(name);      
    }
  }
}

var debug = true;
//demo:http://192.168.1.67:8020/hash/hash.html#url=page/p0
var hashchange = function(){
  var _G_hash = null;
  var $domBox = $('.out'); 
 
  var getPage=function(url){  
    if(url.indexOf('?')>-1){
      url = url.substring(0,url.indexOf('?'));
    }
     
    if(!debug&&GB.Storage.get(url)&&GB.Storage.get(url)!=''){
      success(GB.Storage.get(url));  
    }else{     
//    confirm(2);//confirm() 方法用于显示一个带有指定消息和 OK 及取消按钮的对话框
      $.ajax({       
        dataType:'html',
        url:url+'.html',
        success:function(html){
          if(!GB.Storage.get(url)){
            GB.Storage.set(url,html);
          }
          success(html);
        },
        error:function(e){
        	console.log(e);return;
        }
      })
    }
    
    //页面加载成功
    function success(html){    
      $domBox.html(html);
      window.scrollTo(0,1);
    }
  }

  var change = function(){
  	////decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码
    var url = decodeURIComponent(GB.getParaHash('url')); 
    getPage(url);
  }
  
  var init = function(){ 
    if("onhashchange" in window){
      window.addEventListener ? window.addEventListener("hashchange", change, false) : window.attachEvent("onhashchange", change);
    }else{
      setInterval(function(){
        if(_G_hash!=window.location.hash){
          _G_hash=window.location.hash;
          change();
        }
      },500)
    }
    if(window.location.hash==''){
          window.location.replace('#url=page/wealth');      
    }else{
      change();
    }
  }
  
  init();
  
}()