// ==UserScript==
// @name         github
// @include      https://github.com*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/github.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/github.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  analysis zhihu
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function(){

if(document.body.classList.contains('page-profile')){
	let waitbody_interval=setInterval(()=>{
		let body=document.querySelector('div.application-main ')
		if(!body)return
		clearInterval(waitbody_interval)

		// app_dom
		app=document.createElement('div')
		body.before(app)
		app.classList.add('container-xl')
		app.style.lineHeight='2'
		app.style.color='#c6c6c6'
		app.style.backgroundColor='#333'
		app.style.padding='20px'
		app.style.width='100%'

		// repo page
		// following_button=document.querySelector('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.Layout-sidebar > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(2)')
		// following_button.click()

		// repo page
		// repo_button=document.querySelector('#js-pjax-container > div.mt-4.position-sticky.top-0.d-none.d-md-block.color-bg-default.width-full.border-bottom.color-border-muted > div > div > div.Layout-main > div > nav > a:nth-child(2)')
		// repo_button.click()


		app.innerHTML=`<li>pixi-sound-webpack-example|5.5</li>
		<li>pixi-sound-webpack|7.5</li>`
	}, 200)
}else{
	// console.log('not profile')
}

})();