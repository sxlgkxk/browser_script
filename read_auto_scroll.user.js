// ==UserScript==
// @name         read auto scroll
// @include      http://readonlinefreebook.com/*
// @include      https://readonlinefreebook.com/*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/read_auto_scroll.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/read_auto_scroll.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  auto scroll
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function(){

let is_move=(localStorage.getItem('is_move')=='true');
let speed=1;
let entering_nextpage=false;

// move function
function move() {
	if (is_move) {
		window.scrollBy(0, speed);
		if((window.innerHeight + window.scrollY) +50>= document.body.scrollHeight){
			if (!entering_nextpage){
				entering_nextpage=true
				setTimeout(()=>{
					let next_dom=document.querySelector('body > div.mainContainer.clearfix > div.chapter-detail > div.container.full > div.control-group > a.chapter-direction.nextChapter')
					if(!next_dom) next_dom=document.querySelector('#content-wrapper > section > div > div > div.col-md-8.col-xs-12.section-left > div.content.wl > div > div.text-right > a')
					location.href=next_dom.href
				}, 1000)
			}
		}
		requestAnimationFrame(move);
	}
}
move()

// move button dom insert
body=document.querySelector('body')
move_button=document.createElement('button')
body.before(move_button)

// move button style
move_button.innerHTML='move'
move_button.style.fontWeight='bold'
move_button.style.color='#fff'
move_button.style.backgroundColor='#333'
move_button.style.position='fixed'
move_button.style.bottom='100px'
move_button.style.right='50px'
move_button.style.width='50px'
move_button.style.height='50px'
move_button.style.opacity=0.8
move_button.style.zIndex=1
move_button.onclick=()=>{
	is_move=!is_move;
	localStorage.setItem('is_move', is_move);
	move()
}

})();