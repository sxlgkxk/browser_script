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
		main()
	},200)
}

class Three{
	constructor(canvasWidth=400, canvasHeight=300){
		this.renderer=new THREE.WebGLRenderer();
		this.canvasWidth=canvasWidth;
		this.canvasHeight=canvasHeight;
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, this.canvasWidth / this.canvasHeight, 0.1, 1000 );
		this.dom=this.renderer.domElement

		this.renderer.setSize(this.canvasWidth, this.canvasHeight);
		this.camera.position.z = 5;


		this.geometry = new THREE.BoxGeometry();
		this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		this.cube = new THREE.Mesh( this.geometry, this.material );

		this.scene.add( this.cube );
	}

	run() {
		this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;
		this.renderer.render( this.scene, this.camera );
		requestAnimationFrame(()=>this.run());
	};
}

//-------------------------------- code snippets --------------------------------



//-------------------------------- main --------------------------------

runFunc(function() {
	three=new Three(800,600)
	document.body.before(three.dom);

	three.run();
 },["THREE","Api"])

})();