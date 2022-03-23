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
// @require      https://threejs.org/build/three.js
// ==/UserScript==

(function(){

//-------------------------------- common functions --------------------------------

function runFunc(main, waitList=[]){
	let wait_interval=setInterval(function(){
		for(let wait of waitList)
			if (!(wait in window)){
				console.log("waiting "+wait)
				return
			}
		clearInterval(wait_interval)
		try {
			main()
		} catch (error) {
			console.error(error)
		}
	},200)
}

//-------------------------------- code snippets --------------------------------

function removeUsedBook(){
	sidebar=document.querySelector('#content > div > div.aside')
	if(!sidebar)return
	let is_start_remove=false
	for(let dom of sidebar.children){
		if(dom.tagName=="H2" && dom.innerText=="二手市场")
			is_start_remove=true
		if(is_start_remove)
			dom.hidden=true
	}

}

//-------------------------------- main --------------------------------

runFunc(function() {
	removeUsedBook();
	return;

	container_dom=document.querySelector("div#wrapper")

	app_dom=document.createElement('div')
	app_dom.innerHTML=`<div id="panel"></div><br>
		<style>
			#panel{
				// background-color: #232323;
				background-color: #ffffff;
				// color: #ddd;
				padding: 10px;
				height:400px;
			}
			#panel h1{
				color: #ddd;
			}
		</style>
	`
	container_dom.before(app_dom)

	panel=document.querySelector('#panel')
	panel.innerHTML =`
		<h1>Info</h1>
		<table>
			<tbody>
				<tr>
					<td>hi</td>
					<td>hi</td>
					<td>hi</td>
				</tr>
				<tr>
					<td>hi</td>
					<td>hi</td>
					<td>hi</td>
				</tr>
			</tbody>
		</table>

		<p>lorem ipsum dolor sit amet, consectetur. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet</p>

		<h1>Comment</h1>
		<p>lorem ipsum dolor sit amet, consectetur. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet</p>

		<h1>Relative</h1>
		<p>lorem ipsum dolor sit amet, consectetur. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet</p>

		<button class="customBtn">btn1</button>
		<button class="customBtn">btn2</button>
		<button class="customBtn">btn3</button>
	`


	panel_3d=document.createElement("div")
	document.body.before(panel_3d);
	panel_3d.innerHTML =`<button class="float_btn" id="float_3d_btn">btn</button>`

	document.querySelector('button#float_3d_btn').onclick = function() {
		window.renderer.domElement.hidden=!window.renderer.domElement.hidden
	}
 },[])

})();