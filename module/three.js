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
		Renderer
		Scene
		Camera
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
		Control

	2. 关于默认视角等的选择:
		1. wasd在水平上, 朝面朝的方向前后左右移动, 斜向移动时, 保持速度不变
		2. 默认面积大小32^3
		3. 初始位置: 底面, 底面中心点

*/
(function(){

class _Object{
	/*
- 3d图表
- 2d图表
- 视频/图片
- 网页嵌入
- 建造
	- 地面划线
	- 平地面
	- 竖墙
	*/
	static Line(){
		let points = [];
		points.push( new THREE.Vector3( - 10, 0, 0 ) );
		points.push( new THREE.Vector3( 0, 10, 0 ) );
		points.push( new THREE.Vector3( 10, 0, 0 ) );
		let geometry = new THREE.BufferGeometry().setFromPoints( points );

		let material = new THREE.LineBasicMaterial( { color: 0x0000ff } )
		let line = new THREE.Line( geometry, material );
		return line
	}

	static Cube(){
		let geometry = new THREE.BoxGeometry();
		let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		let cube = new THREE.Mesh(geometry,material );
		return cube
	}
}

class Three{
	/*
		1. 功能说明
			新建3d dom
		
		2. 函数
			constructor : 初始化, 新建dom
			run 		: 开始渲染
			setSize 	: 设置canvas大小
		
		3. 属性(this.xx)
			Config

			Renderer
			Scene
			Camera

			Objects

		4. 补充说明
			1. THREE的接口: 
				Renderer: WebGLRenderer
				Camera 	: PerspectiveCamera
				Scene 	: Scene

			2. 使用方法:
				1. new Three()
				2. Three.run()
				3. 通过操作Three.Objects来操作场景内元素
	*/
	constructor(canvasWidth=320, canvasHeight=240){
		// Config
		this.Config={
			canvasWidth: 320,
			canvasHeight: 240
		}
		this.Config.canvasWidth=canvasWidth;
		this.Config.canvasHeight=canvasHeight;

		// Renderer
		this.Renderer=new THREE.WebGLRenderer();
		this.Renderer.setSize(this.Config.canvasWidth, this.Config.canvasHeight);

		// Scene
		this.Scene = new THREE.Scene();

		// Camera
		this.Camera = new THREE.PerspectiveCamera( 90, this.Config.canvasWidth / this.Config.canvasHeight, 0.1, 1000 );

		this._Objects=[]
		this.setMap()
	}

	run() {
		this.Renderer.render( this.Scene, this.Camera );
		requestAnimationFrame(()=>this.run());
	};

	setSize(width, height){
	}

	getDom(){
		return this.Renderer.domElement
	}

	setMap(){
	}

	get Objects(){return this._Objects}
	set Objects(objects){
		this._Objects=objects
	}
}


window.Three=Three;














})();