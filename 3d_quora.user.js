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
	wait_interval=setInterval(function(){
		for(let wait of waitList)
			if (!(wait in window)){
				console.log("waiting "+wait)
				return
			}
		clearInterval(wait_interval)
		main()
	},200)
}

//-------------------------------- main --------------------------------

runFunc(function() {
	panel_3d=document.createElement("div")
	document.body.before(panel_3d);
	panel_3d.innerHTML =`<button class="float_btn" id="float_3d_btn">3d</button>
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
		[hidden] { display: none !important; }
	</style>`

	const scene = new THREE.Scene();
	// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	const camera = new THREE.PerspectiveCamera( 75, 400 / 300, 0.1, 1000 );

	const renderer = new THREE.WebGLRenderer();
	window.renderer = renderer;
	// renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setSize(400, 300);
	// renderer.domElement.hidden =true;
	document.body.before( renderer.domElement );

	const geometry = new THREE.BoxGeometry();
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 5;

	function animate() {
		requestAnimationFrame( animate );

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		renderer.render( scene, camera );
	};

	animate();

	document.querySelector('button#float_3d_btn').onclick = function() {
		window.renderer.domElement.hidden=!window.renderer.domElement.hidden
	}
 },["THREE","Api"])

})();