// ==UserScript==
// @name         read_log
// @include      http://readonlinefreebook.com/*
// @include      https://readonlinefreebook.com/*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/read_log.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/read_log.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  read log
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

//-------------------------------- common functions --------------------------------

function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return ((h[st]||b[st]) / ((h[sh]||b[sh])) * 100).toFixed(2);
}

(function(){

//-------------------------------- code snippets --------------------------------

function addLine(){
	line=document.createElement("hr")
	line.classList.add("mark")
	line.style.top=document.documentElement["scrollTop"]+100+"px"
	line.style.left='0px'
	line.style.width='100%'
	body.before(line)
}

//-------------------------------- main --------------------------------

// line style
style=document.createElement("div")
body.before(style)
style.innerHTML =`<style>
	hr.mark{
		position: absolute;
	}
</style>`

setInterval(()=>{
	addLine()
},1000*300)


})();