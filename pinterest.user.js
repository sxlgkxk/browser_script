// ==UserScript==
// @name         pinterest
// @include      *pinterest*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/pinterest.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/pinterest.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  pinterest extension
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function(){

	// setTimeout(()=>{
		container=document.querySelector('#__PWS_ROOT__ > div:nth-child(1) > div.appContent > div > div > div > div.Closeup.Module > div > div > div > div > div.m2F.zI7.iyn.Hsu > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div.Jea.jzS.zI7.iyn.Hsu')
		btn=document.createElement('button')
		btn.innerHTML='copy'
		container.before(btn)
		btn.style.height='50px'
		btn.onclick=()=>{
			img=document.querySelector('#__PWS_ROOT__ > div:nth-child(1) > div.appContent > div > div > div > div.Closeup.Module > div > div > div > div > div.m2F.zI7.iyn.Hsu > div > div > div > div > div > div > div > div > div:nth-child(1) > div > div > div.sLG.zI7.iyn.Hsu > div > div.XiG.zI7.iyn.Hsu > div > div > img').src
			img=img.replace(/i\.pinimg\.com\/.*?\//, 'i.pinimg.com/345x/')

			btn.style.backgroundColor='#0ca40c'
			text=`![${location.href}](${img})\n`
			navigator.clipboard.writeText(text).then(() =>{
				console.log('Async: Copying to clipboard was successful!');
			})
		}
	// }, 1000)


})();