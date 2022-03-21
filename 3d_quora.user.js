// ==UserScript==
// @name         3d_quora
// @include      https://www.quora.com*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/3d_quora.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/3d_quora.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.1
// @description  3d quora
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==


(function(){

//-------------------------------- panel_3d --------------------------------

panel_3d=document.createElement("div")
document.body.before(panel_3d);
panel_3d.innerHTML =`<button class="float_btn">3d</button>
<style>
	button.float_btn{
		font-weight: bold;
		color: #fff;
		background-color: #333;
		position: fixed;
		width: 50px;
		height: 50px;
		right: 50px;
		bottom: 50px;
		opacity: 0.8;
		z-index: 3000;
	}
</style>`

})();