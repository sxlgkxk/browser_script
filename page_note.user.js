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
<div id="all_notes_panel" hidden>
	<h1>note</h1>
	<h1>note</h1>
</div>
<style>
	button.noteBtn {
		font-weight: bold;
		color: #fff;
		background-color: #333;
		position: fixed;
		bottom: 0px;
		right: 50px;
		width: 50px;
		height: 50px;
		opacity: 0.8;
		z-index: 3000;
	}
	div#all_notes_panel pre{
		color: #fff;
	}
	div#all_notes_panel{
		color: #fff;
		background-color: #333;
		padding-top: 42px;
		padding-left: 10px;
		padding-right: 10px;
		padding-bottom: 10px;
	}
	textarea.notePanel{
		font-weight: bold;
		color: #fff;
		background-color: #333;
		position: fixed;
		bottom: 50px;
		right: 0px;
		left: 0px;
		top: 50px;
		opacity: 0.9;
		z-index: 3000;
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

document.toggleAllNotesPanel=()=>{
	all_notes_panel=document.querySelector("#all_notes_panel");
	if(all_notes_panel.hidden){
		html=``
		for(i=0;i<localStorage.length;i++){
			key=localStorage.key(i)
			if (key.substr(0,5)=="note_"){
				url=new URL(key.substring(5))
				note=localStorage.getItem(key)
				if(!note)
					continue
				html+=`<a href="`+url.href+`" style="color: #8bdb81; font-weight: bold">`+url.pathname+`</a><pre>`+note+`</pre><hr>`
			}
		}
		html+=`<h1>read note status</h1>`
		all_notes_panel.innerHTML=html
		all_notes_panel.hidden=false
	}else{
		all_notes_panel.hidden=true
	}
}
document.toggleNotePanle=()=>{
	// all_notes_panel
	if(document.documentElement["scrollTop"]<50){
		document.toggleAllNotesPanel()
	}else{
		// notePanel
		note_panel=document.querySelector("textarea.notePanel");
		if(note_panel.hidden)
			document.showPanel()
		else
			document.hidePanel()
	}
}

// focus shortcut
document.addEventListener("keydown", function(event) {
	panel=document.querySelector("textarea.notePanel");
	if (event.ctrlKey && event.altKey && event.key=="e"){
		if(document.documentElement["scrollTop"]<50){
			document.toggleAllNotesPanel()
		}else{
			document.showPanel()
			panel.focus()
		}
	}else if(event.key=="Escape"){
		document.hidePanel()
		panel.blur()
	}
});

})();