// ==UserScript==
// @name         ticktick_gtd
// @include      https://dida365.com/webapp/*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/ticktick_gtd.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/ticktick_gtd.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  ticktick gtd
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function(){

	let btn_dom=null
	let wait_dom_interval=setInterval(() =>{
		btn_dom=document.querySelector("#container-main > div.fixed.inset-0 > div > div.flex-1.w-full.overflow-hidden > div > div > div > div.flex.justify-between.items-center > span")
		if(!btn_dom) return

		clearInterval(wait_dom_interval)
		btn_dom.click()

		btn_dom.innerHTML +=`<style>
			div.dropdown-menu.dropdown-menu-placement-bottomRightBoult{max-width:2000px !important;}
		</style>`

		let list_dom=document.querySelector('body > div:nth-child(27) > div > div') // .cloneNode(true)

		// list_dom.after
		// replace_dom=document.createElement('div')
		// list_dom.after(replace_dom)

		// table_dom.before
		let table_dom=document.querySelector("#container-main > div.fixed.inset-0 > div > div.flex-1.w-full.overflow-hidden > div > div > div > div.flex > div > div:nth-child(1)")
		table_dom.before(list_dom)

		list_dom.style.position="static"
		list_dom.style.width="800px"

	}, 200)

})();