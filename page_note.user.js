// ==UserScript==
// @name         page_note
// @include      *
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/page_note.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/page_note.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  page note
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

var scripts_dom = document.createElement('script');
scripts_dom.src = 'https://unpkg.com/axios/dist/axios.min.js';
scripts_dom.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(scripts_dom);

(function(){

// move button dom insert
body=document.querySelector('body')
note_button=document.createElement('div')
body.before(note_button)
note_button.innerHTML=`<button class="noteBtn" onclick="document.toggleNotePanle()">note</button>
<textarea class="notePanel" hidden></textarea>
<style>
	button.noteBtn {
		font-weight: bold;
		color: #fff;
		background-color: #333;
		position: fixed;
		bottom: 150px;
		right: 50px;
		width: 50px;
		height: 50px;
		opacity: 0.8;
		z-index: 1;
	}
	textarea.notePanel{
		font-weight: bold;
		color: #fff;
		background-color: #333;
		position: fixed;
		bottom: 200px;
		right: 0px;
		left: 0px;
		top: 50px;
		opacity: 0.9;
		z-index: 1;
		padding: 30px;
	}
</style>`

// hide/show functions
document.hidePanel=()=>{
	panel=document.querySelector("textarea.notePanel");
	if(!panel.hidden){
		text=panel.value;
		localStorage.setItem("note_"+location.href,text)
		panel.hidden=true
	}
}
document.showPanel=()=>{
	panel=document.querySelector("textarea.notePanel");
	if(panel.hidden){
		text=localStorage.getItem("note_"+location.href)
		panel.value=text;
		panel.hidden=false
	}
}

// note event
document.toggleNotePanle=()=>{
	panel=document.querySelector("textarea.notePanel");
	if(panel.hidden)
		document.showPanel()
	else
		document.hidePanel()
}

// focus shortcut
document.addEventListener("keydown", function(event) {
	panel=document.querySelector("textarea.notePanel");
	if (event.ctrlKey && event.altKey && event.key=="e"){
		document.showPanel()
		panel.focus()
	}else if(event.key=="Escape"){
		document.hidePanel()
		panel.blur()
	}
});

})();