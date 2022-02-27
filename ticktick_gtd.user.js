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

var scripts_dom = document.createElement('script');
scripts_dom.src = 'https://unpkg.com/axios/dist/axios.min.js';
scripts_dom.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(scripts_dom);

(function () {
	let wait_dom_interval = setInterval(() => {
		// let container_dom = document.querySelector("#container-main > div.fixed.inset-0 > div > div.flex-1.w-full.overflow-hidden > div > div > div > div.flex > div > div:nth-child(1)")
		let container_dom = document.querySelector("#container-main > div.fixed.inset-0 > div > div.flex-1.w-full.overflow-hidden > div > div > div > div.flex")
		if (!container_dom || !axios) return

		clearInterval(wait_dom_interval)

		// app_dom
		let app_dom = document.createElement('div')
		let app_html=""
		container_dom.before(app_dom)

		// axios
		axios.get("https://api.dida365.com/api/v2/pomodoros/timeline",{ withCredentials: true })
			.then((response) => {
				for(day_data of response.data){
					app_html+=`<li>`+day_data.startTime+`</li>`
				}
				app_dom.innerHTML = app_html
			})
	}, 200)
})();