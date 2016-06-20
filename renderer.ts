///<reference path="./mesh.ts"/>
///<reference path="./keylistener.ts"/>
///<reference path="./three.d.ts"/>


class Renderer
{
	m_renderer: THREE.WebGLRenderer;
	m_scene: THREE.Scene;

	m_dummy: THREE.Object3D;
	m_camera: THREE.Camera;
	
	m_terrain: Mesh;
	m_keylistener: KeyListener;

	m_originPoint: THREE.Vector3;

	m_mouseOldX: number;
	m_mouseOldY: number;

	m_screenWidth: number;
	m_screenHeight: number;

	constructor()
	{

		//create things
		this.m_keylistener = new KeyListener();
		this.m_mouseOldX = 0;
		this.m_mouseOldY = 0;
		this.m_screenWidth = 1000;
		this.m_screenHeight = 1000;
		
		
		this.m_renderer = new THREE.WebGLRenderer();
		this.m_renderer.setSize(window.innerWidth, window.innerHeight);
		this.m_renderer.setClearColor(0x6655FF,1);
		this.m_originPoint = new THREE.Vector3(0,0,0);
		
		document.getElementById("canvas").appendChild(this.m_renderer.domElement);

		this.m_scene= new THREE.Scene();

		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		var cube = new THREE.Mesh( geometry, material );
		this.m_scene.add( cube );
		
		this.m_camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
		this.m_dummy = new THREE.Object3D;
		this.m_scene.add(this.m_dummy);
		
		this.m_camera.position.z=150;
		
		this.m_camera.lookAt(new THREE.Vector3(0,0,0));

		this.m_dummy.add(this.m_camera);
		
		var light = new THREE.AmbientLight( 0x404040 ); // soft white light
		//this.m_scene.add( light );
		this.m_terrain = new Mesh(this.m_scene);

		
	}

	run(): void
	{
		requestAnimationFrame(() => this.run());
		this.m_renderer.render(this.m_scene, this.m_camera);
		//this.m_terrain.render(this.m_renderer, this.m_scene, this.m_camera);
		//if we have right click rotate the camera around the origin
		if(this.m_keylistener.getRightMouseButtonDown())
 		{

			//rotate camera around origin
			var mouseX:number = this.m_keylistener.getMouseX();
			var mouseY:number = this.m_keylistener.getMouseY();
			if(this.m_mouseOldX != mouseX)
			{
				//this is strange 
				this.m_dummy.rotation.y += (this.m_mouseOldX - mouseX)/360;
				this.m_dummy.rotation.x -= (this.m_mouseOldY - mouseY)/360;
				//this.m_dummy.rotation.y+=0.1;
				//normalize rotation

				
				this.m_mouseOldX = mouseX;
				this.m_mouseOldY = mouseY;
				console.log(this.m_dummy.rotation.y);
				
			}
			
		}
		if(this.m_keylistener.getMouseWheel())
		{
		}

		if(this.m_keylistener.getLeftMouseButtonDown())
		{
			//get mouse vector
			//then paint onto mesh
			var mouseX : number = this.m_keylistener.getMouseX();
			var mouseY : number = this.m_keylistener.getMouseY();
			//do some math here
			var mouseVector : THREE.Vector2 = new THREE.Vector2(mouseX, mouseY);

			mouseVector.x = 2 * (mouseX / window.innerWidth) - 1;
			mouseVector.y = -2 * (mouseY / window.innerHeight) + 1;


			
			this.m_terrain.paint(mouseVector, this.m_camera);
			
		}
	}

	
}
