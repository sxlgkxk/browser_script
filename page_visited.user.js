// ==UserScript==
// @name         page_visited
// @include      https://www.merriam-webster.com/*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/read_auto_scroll.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/read_auto_scroll.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  page visited
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function(){

val=localStorage.getItem(location.href)
if(val){
	body=document.querySelector('body')
	css_dom=document.createElement('div')
	body.after(css_dom)
	css_dom.innerHTML=`<style>
		body{
			background-color: #ddd !important;
		}
	</style>`
}

localStorage.setItem(location.href, "{}")

})();