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

(function () {

	//-------------------------------- common functions --------------------------------

	function addScript(src) {
		let scripts_dom = document.createElement('script');
		scripts_dom.src = src;
		scripts_dom.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(scripts_dom);
	}
	addScript('https://unpkg.com/axios/dist/axios.min.js')

	function addStyle(html) {
		let style = document.createElement("div")
		document.body.before(style)
		style.innerHTML = `<style>` + html + `</style>`
	}

	//-------------------------------- code snippets --------------------------------

	// dom insert
	let note_dom = document.createElement('div')
	document.body.before(note_dom)
	note_dom.innerHTML = `
		<button class="noteBtn" onclick="document.toggleNotePanle()">note</button>
		<textarea class="notePanel" hidden></textarea>
		<div id="all_notes_panel" hidden>
			<div id="allNotes"></div>
		</div>`

	addStyle(`
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
			color: #ddd;
		}
		div#all_notes_panel{
			color: #ddd;
			background-color: #333;
			padding-top: 42px;
			padding-left: 10px;
			padding-right: 10px;
			padding-bottom: 10px;
			z-index: 3000;
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
		[hidden] { display: none !important; }
		//div#mw-head, div#mw-panel{display: none !important;}
	`)

	// hide/show functions
	document.hidePanel = () => {
		let panel = document.querySelector("textarea.notePanel");
		if (!panel.hidden) {
			let text = panel.value;
			let name=text.match(/^main/) ? '/' : location.pathname;
			localStorage.setItem("note_" + name, text)
			panel.hidden = true
		}
	}
	document.showPanel = (name=location.pathname) => {
		let panel = document.querySelector("textarea.notePanel");
		if (panel.hidden) {
			let text = localStorage.getItem("note_" + name)
			panel.value = text;
			panel.hidden = false
		}
	}
	document.toggleAllNotesPanel = () => {
		let all_notes_panel = document.querySelector("#all_notes_panel");
		if (all_notes_panel.hidden) {
			let html = ``
			for (i = 0; i < localStorage.length; i++) {
				let key = localStorage.key(i)
				if (key.substring(0, 5) == "note_") {
					let url = new URL(location.origin+key.substring(5))
					let note = localStorage.getItem(key)
					if (!note)
						continue
					html += `<a href="` + url.href + `" style="color: #8bdb81; font-weight: bold">` + url.pathname + `</a><pre>` + note + `</pre><hr>`
				}
			}
			let noteList = document.querySelector("#allNotes")
			noteList.innerHTML = html
			all_notes_panel.hidden = false
		} else {
			all_notes_panel.hidden = true
		}
	}
	document.toggleNotePanle = () => {
		// all_notes_panel
		// if (document.documentElement["scrollTop"] == 0 && ! (window.innerHeight + window.scrollY) >= document.body.scrollHeight){
		if (document.documentElement["scrollTop"] <= 50){
			document.toggleAllNotesPanel()
		} else {
			// notePanel
			let note_panel = document.querySelector("textarea.notePanel");
			if (note_panel.hidden)
				document.showPanel()
			else
				document.hidePanel()
		}
	}

	// C-A-e / Esc
	document.addEventListener("keydown", function (event) {
		let panel = document.querySelector("textarea.notePanel");
		if (event.ctrlKey && event.altKey && event.key == "a") {
			let note_panel = document.querySelector("textarea.notePanel");
			if (note_panel.hidden){
				document.showPanel('/')
				panel.focus()
			}else
				document.hidePanel()
		}else if (event.ctrlKey && event.altKey && event.key == "e") {
			if (document.documentElement["scrollTop"] <=50 ) {
				document.toggleAllNotesPanel()
			} else {
				let note_panel = document.querySelector("textarea.notePanel");
				if (note_panel.hidden){
					document.showPanel()
					panel.focus()
				}else
					document.hidePanel()
			}
		} else if (event.key == "Escape") {
			document.hidePanel()
			panel.blur()
		}
	});

})();