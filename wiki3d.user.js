// ==UserScript==
// @name        wiki3d
// @include     *wikipedia*
// @updateURL   https://github.com/sxlgkxk/browser_script/raw/main/wiki3d.user.js
// @downloadURL https://github.com/sxlgkxk/browser_script/raw/main/wiki3d.user.js
// @supportURL  https://github.com/sxlgkxk/browser_script/issues
// @version     0.3
// @description wiki 3d
// @namespace   http://sxlgkxk.github.io/
// @author      sxlgkxk
// @icon        http://sxlgkxk.github.io/im/avatar.jpg
// @license     MIT
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @require		https://threejs.org/build/three.js
// @require		https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/jsm/libs/lil-gui.module.min.js
// @require 	https://cdn.jsdelivr.net/npm/lil-gui@0.16
// @require 	https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js
// ==/UserScript==


(function () {

	//-------------------------------- common functions --------------------------------

	function addScript(src) {
		let scripts_dom = document.createElement('script');
		scripts_dom.src = src;
		scripts_dom.type = src.match(/module/) ? 'module' : 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(scripts_dom);
	}
	addScript('https://unpkg.com/axios/dist/axios.min.js')
	addScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js')


	function addStyle(html) {
		let style = document.createElement("div")
		document.body.before(style)
		style.innerHTML = `<style>` + html + `</style>`
	}

	//-------------------------------- code snippets --------------------------------

	// dom insert
	let three_dom = document.createElement('div')
	document.body.before(three_dom)
	three_dom.innerHTML = `
		<div id="three_panel">
			<img src="https://sxlgkxk.github.io/im/3d_text_walls.jpg" id="threePlaceholder">
		</div>`

	addStyle(`
		img#threePlaceholder{
			width: 800px;
			margin-left:auto;
			margin-right:auto;
			display:block;
			margin-top: 10px;
			margin-bottom: 10px;
		}
	`)



})();