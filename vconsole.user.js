// ==UserScript==
// @name		 vconsole
// @include      *
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/vconsole.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/vconsole.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  vconsole extension
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function(){
	function addScript(src) {
		var scripts_dom = document.createElement('script');
		scripts_dom.src = src;
		scripts_dom.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(scripts_dom);
	}
	addScript('https://unpkg.com/vconsole@latest/dist/vconsole.min.js')
	var vConsole = new window.VConsole({ theme: 'dark' });
})();