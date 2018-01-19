/**
 * @description Automatic locate the publicPath and set it up for webpack.
 */


'use strict';

/**
 * Get current script path
 * @return {String} The path of current script
 * @example
 * get 'file:///C:/git/live2d-widget/dev/bundle.js' or 'https://www.host.com/test/js/bundle.js'
 */

function getCurrentPath(){

  try{

    // FF, Chrome, Modern browsers
    // use their API to get the path of current script

    // a.b();
    // console.log('wpStage1');

    return document.currentScript.src;

    if(DOC.currentScript){ // FF 4+
      return DOC.currentScript.src;
    }

  }catch(e){

    // document.currentScript doesn't supports

    // console.log('wpStage2');

    // Method 1
    // https://github.com/mozilla/pdf.js/blob/e081a708c36cb2aacff7889048863723fcf23671/src/shared/compatibility.js#L97
    // IE, Chrome < 29

    let scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1].src;

/*
    // Method 2
    // parse the error stack trace maually
    // https://github.com/workhorsy/uncompress.js/blob/master/js/uncompress.js#L25

    let stack = e.stack;
    let line = null;

    // Chrome and IE
    if (stack.indexOf('@') !== -1) {
      line = stack.split('@')[1].split('\n')[0];
    // Firefox
    } else {
      line = stack.split('(')[1].split(')')[0];
    }
    line = line.substring(0, line.lastIndexOf('/')) + '/';
    return line;
*/
/*
    // Method 3
    // https://www.cnblogs.com/rubylouvre/archive/2013/01/23/2872618.html

    let stack = e.stack;
    if(!stack && window.opera){
      // Opera 9没有e.stack,但有e.Backtrace,但不能直接取得,需要对e对象转字符串进行抽取
      stack = (String(e).match(/of linked script \S+/g) || []).join(' ');
    }
    if(stack){
      // e.stack最后一行在所有支持的浏览器大致如下:
      // chrome23:
      // @ http://113.93.50.63/data.js:4:1
      // firefox17:
      // @http://113.93.50.63/query.js:4
      // opera12:
      // @http://113.93.50.63/data.js:4
      // IE10:
      // @ Global code (http://113.93.50.63/data.js:4:1)
      stack = stack.split(/[@ ]/g).pop(); // 取得最后一行,最后一个空格或@之后的部分
      stack = stack[0] == '(' ? stack.slice(1,-1) : stack;
      return stack.replace(/(:\d+)?:\d+$/i, ''); // 去掉行号与或许存在的出错字符起始位置
    }
    let nodes = head.getElementsByTagName('script'); // 只在head标签中寻找
    for(var i = 0, node; node = nodes[i++];){
      if(node.readyState === 'interactive'){
        return node.className = node.src;
      }
    }
*/
  }

}

// expose the path to the global,
// and wp will finish the following work
__webpack_public_path__ = getCurrentPath().replace(/[^/\\\\]+$/, '');
if (process.env.NODE_ENV === 'development'){
  console.log(`Live2Dwidget: publicPath: ${__webpack_public_path__}`);
}

export {
  getCurrentPath,
}
