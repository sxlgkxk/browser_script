// ==UserScript==
// @name         kibana
// @include      *xiaoice-k8s-kibana.xiaoice.com*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/kibana.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/kibana.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  kibana extension
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function(){

waitdom_interval=setInterval(()=>{
	kibana_dom=document.querySelector('div.kbnLocalApplicationWrapper')
	if(!kibana_dom)return
	clearInterval(waitdom_interval)

	app_dom=document.createElement('div')
	app_dom.innerHTML=`<div id="panel"></div>
		<style>
			#panel{
				background-color: #232323;
				color: #ddd;
				padding: 10px;
			}
			button.customBtn{
			}
		</style>
	`
	kibana_dom.before(app_dom)

	panel=document.querySelector('#panel')
	panel.innerHTML =`
		<button class="customBtn">btn1</button>
		<button class="customBtn">btn2</button>
		<button class="customBtn">btn3</button>
	`


}, 200)



})();