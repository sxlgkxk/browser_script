// ==UserScript==
// @name         read_mark
// @include      http://readonlinefreebook.com/*
// @include      https://readonlinefreebook.com/*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/read_mark.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/read_mark.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  read mark
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function(){

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const create = tag => document.createElement(tag);

function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return ((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100).toFixed(2);
}

// buttons dom insert
body=document.querySelector('body')
mark_button=document.createElement('button')
body.before(mark_button)

goto_latest_button=document.createElement('button')
body.before(goto_latest_button)

// move button style
mark_button.innerHTML=`<style>
	.float_btn{
		font-weight: bold;
		color: #fff;
		background-color: #333;
		position: fixed;
		width: 50px;
		height: 50px;
		opacity: 0.8;
		z-index: 1;
	}
	.float_btn.highlight{
		background-color: #8bdb81;
	}
</style`

// mark_button
mark_button.innerHTML+='mark'
mark_button.id='read_mark_btn'
mark_button.classList.add("float_btn")
mark_button.style.bottom='50px'
mark_button.style.right='50px'
mark_button.onclick=()=>{
	cur_percent=getScrollPercent()
	localStorage.setItem("mark_"+location.href, cur_percent)
	localStorage.setItem("read_latest_date", Math.round(new Date()))
	localStorage.setItem("read_latest", location.href+"_"+cur_percent)
	$("#read_mark_btn").classList.add("highlight")
}

// goto_latest_button
goto_latest_button.innerHTML='latest'
read_latest_date=localStorage.getItem("read_latest_date")
if(read_latest_date){
	read_latest_date=parseInt(read_latest_date)
	now=Math.round(new Date())
	date_html=" "+Math.round((now-read_latest_date)/1000/3600)+"h"
	goto_latest_button.innerHTML+=date_html
}
goto_latest_button.id='goto_latest_btn'
goto_latest_button.classList.add("float_btn")
goto_latest_button.style.bottom='50px'
goto_latest_button.style.right='100px'
goto_latest_button.onclick=()=>{
	data=localStorage.getItem("read_latest")
	url=data.substring(0, data.lastIndexOf("_"))
	percent=parseFloat(data.substring(data.lastIndexOf("_")+1))

	localStorage.setItem("is_goto_recent", "true")
	if(location.href!=url)
		location.href=url
	else{
		document.documentElement["scrollTop"]=percent/100*document.documentElement["scrollHeight"]
		localStorage.setItem("is_goto_recent", "")
	}
}
if(localStorage.getItem("is_goto_recent")) 
	$("#goto_latest_btn").click()

// highlight while scrolling
window.onscroll=()=>{
	latest_percent=parseFloat(localStorage.getItem("mark_"+location.href))
	if(Math.abs(latest_percent/100*document.documentElement["scrollHeight"]-document.documentElement["scrollTop"])<150){
		$("#read_mark_btn").classList.add("highlight")
	}else{
		$("#read_mark_btn").classList.remove("highlight")
	}
}

})();