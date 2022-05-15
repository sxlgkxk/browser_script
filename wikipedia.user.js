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
		if(sidebar)
			sidebar.hidden=!sidebar.hidden
	}
	_head=document.querySelector('#mw-head')
	if(_head)
		_head.addEventListener('click',toggleSidebar)
	toggleSidebar()


	// random page
	head=document.querySelector('#firstHeading')
	dom = document.createElement("div")
	dom.innerHTML=""
	dom.id="randomPage"
	dom.style.cssText = 'background-color: #000; color: #ddd; padding: 15px; margin: 5px;text-align: center;'
	head.before(dom)

	let doms=document.querySelector('#bodyContent').querySelectorAll('a')
	let urlSet=new Set()
	for(let dom of doms){
		let url=dom.href
		if(url.match(/^https:\/\/en.(m\.)*wikipedia.org\/wiki/)){
			if(url.match(/^https:\/\/en.(m\.)*wikipedia.org\/wiki\/.*?([:\(#]|Main_Page|undefined)+.*?/))
				continue
			if(url == location.href)
				continue
			urlSet.add(url)
		}
	}
	let randomUrls=Array.from(urlSet)
	randomUrls=randomUrls.sort(()=>Math.random()-0.5).slice(0,3)
	for(let url of randomUrls){
		title=url.match(/^https:\/\/en.(m\.)*wikipedia.org\/wiki\/(.*)/)[2]
		console.log(title)
		dom.innerHTML+='<a href="'+url+'">'+title+'</a><br>'
	}


	// move category up
	category=document.querySelector('#mw-normal-catlinks')
	if(category){
		category=category.firstElementChild.nextElementSibling
		head.before(category)
	}


	// move see_also up: not do-able


	// style
	function addStyle(html) {
		style = document.createElement("div")
		document.body.before(style)
		style.innerHTML = `<style>` + html + `</style>`
	}
	addStyle(`
		table.nowraplinks.mw-collapsible.navbox-inner.mw-made-collapsible{
			border: 10px solid #8bdb81 !important;
		}
		#See_also{
			background-color: #8bdb81 !important;
		}
	`)


	// -------------------------------- slider --------------------------------

	addStyle(`
		button.sliderBtn{
			background-color: #fff;
			color: #333;
			padding-top: 4px;
			padding-bottom: 4px;
			padding-left: 9px;
			padding-right: 9px;
			margin-right: 5px;
			margin-bottom: 3px;
			margin-top: 3px;
			border:0px;
		}
	`)

	dom = document.createElement("div")
	dom.innerHTML=`<button id='sliderStopBtn' class="sliderBtn" onclick="window.sliderRun=!window.sliderRun">toggle</button>`
		+ `<div id="sliderList"></div>`
	dom.id="slider"
	dom.style.cssText = 'background-color: #000; color: #ddd; padding: 15px; margin: 5px;text-align: center;'
	head.before(dom)
	window.sliderRun=true;
	let urlList=Array.from(urlSet).sort((url1,url2)=>url1.localeCompare(url2))
	let currentPage=0;
	let pageCapacity=10;
	console.log(urlList)
	function setSliderPage(page){
		let sliderList=document.querySelector('#sliderList')
		sliderList.innerHTML=""
		for(let i=page*pageCapacity;i<(page+1)*pageCapacity;i++){
			if(i>=urlList.length)
				sliderList.innerHTML+="<br>"
			else
				sliderList.innerHTML+='<a href="'+urlList[i]+'">'+urlList[i].match(/^https:\/\/en.(m\.)*wikipedia.org\/wiki\/(.*)/)[2]+'</a><br>'
		}
	}
	setInterval(()=>{
		currentPage=(currentPage+1);
		if(currentPage>=urlList.length/pageCapacity)
			currentPage=0;

		if(window.sliderRun)
			setSliderPage(currentPage)
	},1000)


})();