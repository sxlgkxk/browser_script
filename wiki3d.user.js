// ==UserScript==
// @name         wiki3d
// @include      *wikipedia*
// @updateURL    https://github.com/sxlgkxk/browser_script/raw/main/wiki3d.user.js
// @downloadURL  https://github.com/sxlgkxk/browser_script/raw/main/wiki3d.user.js
// @supportURL   https://github.com/sxlgkxk/browser_script/issues
// @version      0.3
// @description  wiki 3d
// @namespace    http://sxlgkxk.github.io/
// @author       sxlgkxk
// @icon         http://sxlgkxk.github.io/im/avatar.jpg
// @license      MIT
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

// import * as THREE from 'https://threejs.org/build/three.js';
// import { PointerLockControls } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/jsm/controls/PointerLockControls.js'
// import { GUI } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/jsm/libs/lil-gui.module.min.js'

(function () {

	//-------------------------------- common functions --------------------------------

	function addScript(src, content='', type='') {
		let scripts_dom = document.createElement('script');
		if(type){
			scripts_dom.type = type;
			scripts_dom.textContent = content;
		}else if(!src && content){
			scripts_dom.type = 'module';
			scripts_dom.textContent = content;
		}else{
			scripts_dom.src = src;
			scripts_dom.type = 'text/javascript';
		}
		document.getElementsByTagName('head')[0].appendChild(scripts_dom);
	}
	addScript('https://unpkg.com/axios/dist/axios.min.js')
	addScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js')
	addScript('', `
		{
			"imports": {
				"three": "https://cdn.jsdelivr.net/gh/mrdoob/three.js/build/three.module.js"
			}
		}
	`, "importmap")
	addScript('', `
		console.log('wiki3d')
		import { PointerLockControls } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/jsm/controls/PointerLockControls.js';
		console.log(PointerLockControls);
	`)

	function addStyle(html) {
		let style = document.createElement("div")
		document.body.before(style)
		style.innerHTML = `<style>` + html + `</style>`
	}

	//-------------------------------- code snippets --------------------------------

	// dom insert
	let three_dom = document.createElement('div')
	document.body.before(three_dom)
	// three_dom.innerHTML = `
	// 	<div id="three_panel">
	// 		<img src="https://sxlgkxk.github.io/im/3d_text_walls.jpg" id="threePlaceholder">
	// 	</div>`

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


	// /*-------------------------------- Game --------------------------------*/

	// class Game {
	// 	requestFullscreen() {
	// 		var elem = game.container;
	// 		if (elem.requestFullscreen) {
	// 			elem.requestFullscreen();
	// 		} else if (elem.mozRequestFullScreen) { /* Firefox */
	// 			elem.mozRequestFullScreen();
	// 		} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
	// 			elem.webkitRequestFullscreen();
	// 		} else if (elem.msRequestFullscreen) { /* IE/Edge */
	// 			elem.msRequestFullscreen();
	// 		}
	// 	}

	// 	initKeyEvent() {
	// 		const onKeyDown = function (event) {
	// 			switch (event.code) {
	// 				case 'ArrowUp':
	// 				case 'KeyW':
	// 					game.moveForward = true;
	// 					break;

	// 				case 'ArrowLeft':
	// 				case 'KeyA':
	// 					game.moveLeft = true;
	// 					break;

	// 				case 'ArrowDown':
	// 				case 'KeyS':
	// 					game.moveBackward = true;
	// 					break;

	// 				case 'ArrowRight':
	// 				case 'KeyD':
	// 					game.moveRight = true;
	// 					break;

	// 				case 'Space':
	// 					if (game.canJump === true) game.velocity.y += 350;
	// 					game.canJump = false;
	// 					break;
	// 			}
	// 		};

	// 		const onKeyUp = function (event) {
	// 			switch (event.code) {
	// 				case 'ArrowUp':
	// 				case 'KeyW':
	// 					game.moveForward = false;
	// 					break;

	// 				case 'ArrowLeft':
	// 				case 'KeyA':
	// 					game.moveLeft = false;
	// 					break;

	// 				case 'ArrowDown':
	// 				case 'KeyS':
	// 					game.moveBackward = false;
	// 					break;

	// 				case 'ArrowRight':
	// 				case 'KeyD':
	// 					game.moveRight = false;
	// 					break;

	// 				case 'KeyF':
	// 					game.requestFullscreen();
	// 					break;
	// 			}
	// 		};
	// 		document.addEventListener('keydown', onKeyDown);
	// 		document.addEventListener('keyup', onKeyUp);

	// 		game.container.addEventListener('click', function () {
	// 			game.controls.lock();
	// 		});

	// 		game.controls.addEventListener('lock', function () {
	// 		});

	// 		game.controls.addEventListener('unlock', function () {
	// 		});

	// 		window.addEventListener("keydown", function (e) {
	// 			if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1 && game.controls.isLocked === true) {
	// 				e.preventDefault();
	// 			}
	// 		}, false);

	// 		window.addEventListener('resize', onWindowResize);

	// 		function onWindowResize() {
	// 			let width = game.container.clientWidth;
	// 			let height = 600;
	// 			// if fullscreen
	// 			if (document.fullscreenElement) {
	// 				height = window.innerHeight;
	// 			}
	// 			game.camera.aspect = width / height;
	// 			game.camera.updateProjectionMatrix();
	// 			game.renderer.setSize(width, height);
	// 		}
	// 	}

	// 	initElements() {
	// 		let urls = game.content.split('\n')
	// 		for (let url of urls) {
	// 			let cube = element(url);
	// 			cube.position.x = Math.floor(Math.random() * 20) - 10;
	// 			cube.position.y = Math.floor(Math.random() * 3) + 10;
	// 			cube.position.z = Math.floor(Math.random() * 20) - 10;
	// 			game.scene.add(cube);
	// 			game.objects.push(cube);
	// 		}
	// 	}

	// 	initWorld() {
	// 		let ground = new THREE.Mesh(
	// 			new THREE.PlaneGeometry(2000, 2000),
	// 			new THREE.MeshPhongMaterial({ color: 0xa0adaf, shininess: 150 })
	// 		);
	// 		ground.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
	// 		ground.receiveShadow = true;
	// 		game.scene.add(ground);

	// 	}

	// 	constructor(id, content = '') {
	// 		this.container = getContainer(id);
	// 		this.content = content;
	// 		this.objects = [];
	// 		this.prevTime = performance.now();
	// 		this.velocity = new THREE.Vector3();
	// 		this.direction = new THREE.Vector3();

	// 		this.scene = new THREE.Scene();
	// 		this.scene.background = new THREE.Color(0xffffff);
	// 		this.scene.fog = new THREE.Fog(0xffffff, 0, 750);

	// 		this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / 600, 0.1, 1000);
	// 		this.camera.position.set(0, 0, 20);

	// 		// this.gui = new GUI({ width: 200 });
	// 		// this.gui.add({ debug: false }, 'debug')
	// 		// 	.onChange(function (value) {
	// 		// 		console.log(value);
	// 		// 	});

	// 		this.renderer = new THREE.WebGLRenderer({ antialias: true });
	// 		this.renderer.setPixelRatio(window.devicePixelRatio);
	// 		this.renderer.shadowMap.enabled = true;
	// 		this.renderer.setSize(this.container.clientWidth, 600);
	// 		this.container.appendChild(this.renderer.domElement);

	// 		this.controls = new PointerLockControls(this.camera, document.body);
	// 		this.scene.add(this.controls.getObject());

	// 		this.raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);


	// 		this.scene.add(new THREE.AmbientLight(0x505050));

	// 		this.light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
	// 		this.light.position.set(0.5, 1, 0.75);
	// 		this.scene.add(this.light);

	// 		this.dirLight = new THREE.DirectionalLight(0x55505a, 1);
	// 		this.dirLight.position.set(0, 3, 0);
	// 		this.dirLight.castShadow = true;
	// 		this.dirLight.shadow.camera.near = 1;
	// 		this.dirLight.shadow.camera.far = 10;

	// 		this.dirLight.shadow.camera.right = 1;
	// 		this.dirLight.shadow.camera.left = - 1;
	// 		this.dirLight.shadow.camera.top = 1;
	// 		this.dirLight.shadow.camera.bottom = - 1;

	// 		this.dirLight.shadow.mapSize.width = 1024;
	// 		this.dirLight.shadow.mapSize.height = 1024;
	// 		this.scene.add(this.dirLight);

	// 		this.moveForward = false;
	// 		this.moveBackward = false;
	// 		this.moveLeft = false;
	// 		this.moveRight = false;
	// 		this.canJump = false;
	// 	}

	// 	init() {
	// 		this.initKeyEvent();
	// 		this.initElements();
	// 		this.initWorld();
	// 	}
	// 	animate() {
	// 		function animate() {
	// 			requestAnimationFrame(animate)

	// 			const time = performance.now();

	// 			if (game.controls.isLocked === true) {
	// 				game.raycaster.ray.origin.copy(game.controls.getObject().position);
	// 				game.raycaster.ray.origin.y -= 10;

	// 				const intersections = game.raycaster.intersectObjects(game.objects, false);

	// 				const onObject = intersections.length > 0;

	// 				const delta = (time - game.prevTime) / 1000;

	// 				game.velocity.x -= game.velocity.x * 10.0 * delta;
	// 				game.velocity.z -= game.velocity.z * 10.0 * delta;

	// 				game.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

	// 				game.direction.z = Number(game.moveForward) - Number(game.moveBackward);
	// 				game.direction.x = Number(game.moveRight) - Number(game.moveLeft);
	// 				game.direction.normalize(); // game ensures consistent movements in all directions

	// 				if (game.moveForward || game.moveBackward) game.velocity.z -= game.direction.z * 400.0 * delta;
	// 				if (game.moveLeft || game.moveRight) game.velocity.x -= game.direction.x * 400.0 * delta;

	// 				if (onObject === true) {
	// 					game.velocity.y = Math.max(0, game.velocity.y);
	// 					game.canJump = true;
	// 				}

	// 				game.controls.moveRight(- game.velocity.x * delta);
	// 				game.controls.moveForward(- game.velocity.z * delta);

	// 				game.controls.getObject().position.y += (game.velocity.y * delta); // new behavior

	// 				if (game.controls.getObject().position.y < 10) {
	// 					game.velocity.y = 0;
	// 					game.controls.getObject().position.y = 10;
	// 					game.canJump = true;
	// 				}
	// 			}

	// 			game.prevTime = time;

	// 			game.renderer.render(game.scene, game.camera);
	// 		}
	// 		animate();
	// 	}
	// }

	// /*-------------------------------- common functions --------------------------------*/

	// function getContainer(id) {
	// 	let container;
	// 	if (id) {
	// 		container = document.getElementById(id);
	// 	} else {
	// 		container = document.createElement('div');
	// 		document.body.appendChild(container);
	// 	}
	// 	return container
	// }

	// function element(url) {
	// 	// return url
	// 	let geometry = new THREE.BoxGeometry(1, 1, 1);
	// 	let texture = new THREE.TextureLoader().load(url);
	// 	texture.minFilter = THREE.NearestFilter;
	// 	texture.magFilter = THREE.NearestFilter;
	// 	let material = new THREE.MeshBasicMaterial({ map: texture });
	// 	material.side = THREE.DoubleSide;
	// 	let cube = new THREE.Mesh(geometry, material);
	// 	return cube;
	// }

	// /*-------------------------------- init --------------------------------*/

	// let game = null;
	// function init(id = null, content = null) {
	// 	let comment = `
	// `
	// 	console.log('frequent ut');
	// 	console.log('ingame ut');
	// 	console.log(comment);
	// 	game = new Game(id, content);
	// 	game.init();
	// 	game.animate();
	// }

})();