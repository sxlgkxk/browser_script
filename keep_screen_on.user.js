// ==UserScript==
// @name         keep_screen_on
// @include      *
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/read_auto_scroll.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/read_auto_scroll.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  keep screen on
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var scripts_dom = document.createElement('script');
scripts_dom.src = 'https://cdnjs.cloudflare.com/ajax/libs/nosleep/0.3.0/NoSleep.min.js';
scripts_dom.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(scripts_dom);

(function(){

	setInterval(()=>{
		console.log(NoSleep)
	},2000)

})();