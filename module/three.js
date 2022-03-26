/*
1. 代码目的
	自己对three.js的封装. 能够调用Three.xxx两行实现功能

2. 代码结构
	1. 调用的接口: Three

	2. Three内部方法
		constructor 	: 初始化, 新建dom
		run 			: 开始渲染

	2. Three内部属性
		canvasWidth
		canvasHeight
		renderer
		scene
		camera
		dom

		geometry
		material
		cube


3. 数据结构

4. 补充说明
	1. 内部模块拆分
		Camera
		Object
		Map
		Screen
		Texture
		Music
		Control

	2. 关于默认视角等的选择:
		1. wasd在水平上, 朝面朝的方向前后左右移动, 斜向移动时, 保持速度不变
		2. 默认面积大小32^3
		3. 初始位置: 底面, 底面中心点

*/
(function(){

class Three{
	constructor(canvasWidth=320, canvasHeight=240){
		/*
			1. args
				canvasWidth
				canvasHeight
		*/
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

	resize(width, height){
	}

}


window.Three=Three;














})();