// ==UserScript==
// @name 	   	 wikipedia
// @include      *wikipedia*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/wikipedia.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/wikipedia.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  wikipedia extension
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function(){
	// toggle sidebar
	function toggleSidebar(){
		let sidebar=document.querySelector('#mw-panel')
		sidebar.hidden=!sidebar.hidden
	}
	document.querySelector('#mw-head').addEventListener('click',toggleSidebar)
	toggleSidebar()

	// move category up
	head=document.querySelector('#firstHeading')
	category=document.querySelector('#mw-normal-catlinks')
	head.before(category)

})();