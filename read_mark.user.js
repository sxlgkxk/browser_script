// ==UserScript==
// @name         read_mark
// @include      *
// @include      http://readonlinefreebook.com/*
// @include      https://readonlinefreebook.com/*
// @include      *wikipedia.org*
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

(function () {

	//-------------------------------- common functions --------------------------------

	function addScript(src) {
		var scripts_dom = document.createElement('script');
		scripts_dom.src = src;
		scripts_dom.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(scripts_dom);
	}
	addScript('https://unpkg.com/axios/dist/axios.min.js')

	function addStyle(html) {
		style = document.createElement("div")
		document.body.before(style)
		style.innerHTML = `<style>` + html + `</style>`
	}

	//-------------------------------- code snippets --------------------------------

	addStyle(`
	#markPanel{
		color: #fff;
		background-color: #333;
		position: fixed;
		bottom: 100px;
		right: 0px;
		width: 250px;
		opacity: 0.9;
		z-index: 3000;
		padding: 5px;
	}
	a.markUrl{
		font-weight: bold;
		color: #8bdb81;
		padding-right: 10px;
		font-size: 12px;
	}
	a:visited{
		color: #ce6700 !important;
    }
	button.markBtn, button.highlightBtn{
		background-color: #fff;
		color: #333;
		padding-top: 4px;
		padding-bottom: 4px;
		padding-left: 9px;
		padding-right: 9px;
		margin-bottom: 3px;
		margin-top: 3px;
		border:0px;
	}
	[hidden] { display: none !important; }
`)

	//-------------------------------- latest_panel --------------------------------

	mark_panel = document.createElement('div')
	document.body.before(mark_panel)

	mark_panel_list_html = ""
	for (let i = 0; i < 5; i++) {
		data = localStorage.getItem("mark" + i)
		data = data ? JSON.parse(data) : {}
		url = data.url
		title = data.title
		mark_panel_list_html += `
		<div>
			<button onclick="document.setMark(`+ i + `)" class="markBtn">+</button>
			<a href="`+ url + `" class="markUrl" id="mark` + i + `">` + title + `</a>
		</div>
	`
	}

	highlight_html = `<button class="highlightBtn" onclick="document.promptHighlight()">highlight</button>`

	mark_panel.innerHTML = `<div id="markPanel" hidden>`
		+ mark_panel_list_html
		+ highlight_html
		+ `</div>`

	document.toggleMarkPanel = () => {
		markPanel = document.querySelector("#markPanel");
		if (markPanel.hidden) {
			markPanel.hidden = false
		} else {
			markPanel.hidden = true
		}
	}
	document.setMark = function (val) {
		data = { title: document.title.replace(" - Wikipedia", ''), url: window.location.href }
		localStorage.setItem("mark" + val, JSON.stringify(data))
		document.querySelector("#mark" + val).innerHTML = data.title
		document.querySelector("#mark" + val).href = data.url
	}

	//-------------------------------- mark_button --------------------------------

	body = document.querySelector('body')
	mark_button = document.createElement('button')
	document.body.before(mark_button)

	// move button style
	mark_button.innerHTML = `<style>
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
</style`

	// mark_button
	mark_button.innerHTML += 'mark'
	mark_button.id = 'read_mark_btn'
	mark_button.classList.add("float_btn")
	mark_button.style.bottom = '50px'
	mark_button.style.right = '50px'
	mark_button.onclick = () => {
		document.toggleMarkPanel()
	}

	//-------------------------------- highlight --------------------------------

	// style
	function addStyle(html) {
		style = document.createElement("div")
		document.body.before(style)
		style.innerHTML = `<style>` + html + `</style>`
	}
	addStyle(`
		span.highlight{
			color: #555555; 
			font-weight:bold; 
			background-color: #8bdb81;
		}
	`)

	function doHighlight(el=document.body) {
		var keywords=localStorage.getItem("highlight")
		if (!keywords) return;
		keywords=JSON.parse(keywords).join()

		var rQuantifiers = /[-\/\\^$*+?.()|[\]{}]/g;
		keywords = keywords.replace(rQuantifiers, '\\$&').split(',').join('|');
		var pat = new RegExp('(' + keywords + ')', 'gi');
		var span = document.createElement('span');
		// getting all text nodes with a few exceptions
		var snapElements = document.evaluate(
			'.//text()[normalize-space() != "" ' +
			'and not(ancestor::style) ' +
			'and not(ancestor::script) ' +
			'and not(ancestor::textarea) ' +
			'and not(ancestor::code) ' +
			'and not(ancestor::pre)]',
			el, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		if (!snapElements.snapshotItem(0)) { return; }  // end execution if not found

		for (var i = 0, len = snapElements.snapshotLength; i < len; i++) {
			var node = snapElements.snapshotItem(i);
			// check if it contains the keywords
			if (pat.test(node.nodeValue)) {
				// check that it isn't already highlighted
				if (node.className != "highlight" && node.parentNode.className != "highlight") {
					// create an element, replace the text node with an element
					var sp = span.cloneNode(true);
					sp.innerHTML = node.nodeValue.replace(pat, '<span class="highlight" title="highlight">$1</span>');
					node.parentNode.replaceChild(sp, node);
				}
			}
		}
	}
	doHighlight();

	function promptHighlight(){
		text=prompt("请输入需要高亮的关键词")
		if(text){
			keywords=[text]
			localStorage.setItem("highlight", JSON.stringify(keywords))
			doHighlight()
		}
	}
	document.promptHighlight= promptHighlight
})();