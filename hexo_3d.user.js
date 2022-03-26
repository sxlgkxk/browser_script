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

/*
1. 代码目的
	放到sxlgkxk.github.io侧边栏3d项中, 打造自己的Three(module封装). 以此为playground探索3d的自由度与可玩性

	之后, 会尝试一个"github 3d profile"的活动(具有多人性/潮流性/运动性): 之后会打造另一个github_3d_profile.user.js. 按下不表

2. 代码结构

3. 数据结构

4. 补充说明


*/

(function(){

//-------------------------------- common functions --------------------------------

function runFunc(main, waitList=[]){
	let wait_interval=setInterval(function(){
		for(let wait of waitList) if (!(wait in window)){console.log("waiting "+wait);return}
		clearInterval(wait_interval);main();},200)}

//-------------------------------- code snippets --------------------------------



//-------------------------------- main --------------------------------

runFunc(function() {
	// 获取dom
	three=new Three()
	dom=three.dom

	// 插入dom
	container=document.querySelector('#three_container')
	container=container?container:document.body
	container.before(dom);

	// 定制3d空间

	// 运行3d
	three.run();
 },["THREE","Api"])

})();