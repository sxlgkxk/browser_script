// ==UserScript==
// @name         zhihu analysis
// @include      https://www.zhihu.com/people/*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/zhihu_analysis.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/zhihu_analysis.user.js
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

let content=''
let itemlist=[]
let body=null
let app=null
let internal=null

// answerTest
function answerTest(){
	itemlist=document.querySelectorAll('a[data-za-detail-view-element_name="Title"]')

	// answer ready
	if (itemlist.length > 0){
		for(let i=0;i<itemlist.length;i++){
			content+='<li>'+itemlist[i].outerHTML+'</li>'
		}
		content+='</br>'
		app.innerHTML=content

		// into next page
		document.querySelector('#ProfileMain > div.ProfileMain-header > ul > li:nth-child(9) > a').click()

		// start next interval
		clearInterval(interval)
		interval=setInterval(followTest, 200)
	}
}

// followTest
function followTest(){
	itemlist=document.querySelectorAll('.UserItem-title a[data-za-detail-view-element_name="User"]')

	// answer ready
	if (itemlist.length > 0){

		content+=`<table style="width:100%">`

		for(let i=0;i<itemlist.length;i++){
			let user=itemlist[i].outerHTML
			let desc=document.querySelector('#Profile-following > div:nth-child(2) > div:nth-child('+(i+1)+') > div > div > div.ContentItem-head > div > div > div.ztext')
			if (desc) desc=desc.innerHTML
			content+='<tr><td style="text-align: right; padding-right:20px">'+user+'</td><td>'+desc+'</td></tr>'
		}
		content+='</table>'
		app.innerHTML=content

		// into next page

		// start next interval
		clearInterval(interval)
		// interval=setInterval(followTest, 200)
	}
}

let wait_dom_interval=setInterval(()=>{
	// into answer page
	let answer_tab=document.querySelector('#ProfileMain > div.ProfileMain-header > ul > li:nth-child(2) > a')
	if(!answer_tab)return
	clearInterval(wait_dom_interval)
	answer_tab.click()

	// dom
	body=document.querySelector('#ProfileHeader > div')
	app=document.createElement('div')
	document.body.before(app)

	// style
	app.style.lineHeight='2'
	app.style.color='#c6c6c6'
	app.style.backgroundColor='#333'
	app.style.padding='20px'

	interval=setInterval(answerTest, 200)
}, 200)

})();