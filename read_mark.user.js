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

// move button dom insert
body=document.querySelector('body')
mark_button=document.createElement('button')
body.before(mark_button)

// move button style
mark_button.innerHTML='mark'
mark_button.id='read_mark_btn'
mark_button.style.fontWeight='bold'
mark_button.style.color='#fff'
mark_button.style.backgroundColor='#333'
mark_button.style.position='fixed'
mark_button.style.bottom='50px'
mark_button.style.right='50px'
mark_button.style.width='50px'
mark_button.style.height='50px'
mark_button.style.opacity=0.8
mark_button.style.zIndex=1
mark_button.onclick=()=>{
	cur_percent=getScrollPercent()
	localStorage.setItem("mark_"+location.href, cur_percent)
	$("#read_mark_btn").style.backgroundColor='#8bdb81'
}

window.onscroll=()=>{
	latest_percent=parseFloat(localStorage.getItem("mark_"+location.href))
	if(Math.abs(latest_percent/100*document.documentElement["scrollHeight"]-document.documentElement["scrollTop"])<100){
		$("#read_mark_btn").style.backgroundColor='#8bdb81'
	}else{
		$("#read_mark_btn").style.backgroundColor='#333'
	}
}

})();