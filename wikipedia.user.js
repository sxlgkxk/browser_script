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

	// random page
	head=document.querySelector('#firstHeading')
	dom = document.createElement("div")
	dom.innerHTML='<a href="#">random</a>, <span id="wikiTimer">13:0</span>'
	dom.style.cssText = 'background-color: #000; color: #ddd; padding: 5px; margin: 5px;text-align: center;'
	head.before(dom)

	// move category up
	category=document.querySelector('#mw-normal-catlinks').firstElementChild.nextElementSibling
	head.before(category)

})();