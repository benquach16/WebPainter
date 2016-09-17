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
	m_cameraDistance: number;
	m_angleX: number;
	m_angleY: number;

	m_screenWidth: number;
	m_screenHeight: number;

	constructor()
	{

		//create things
		this.m_keylistener = new KeyListener();
		this.m_mouseOldX = 0;
		this.m_mouseOldY = 0;
		this.m_angleX = 180;
		this.m_angleY = 20;
		this.m_cameraDistance = 150;

				
		this.m_renderer = new THREE.WebGLRenderer();
		this.m_renderer.setSize(window.innerWidth, window.innerHeight);
		this.m_renderer.setClearColor(0x6655FF,1);
		//TODO: REPLACE WITH A REAL ORBIT CAMERA
		this.m_originPoint = new THREE.Vector3(0,0,0);
		
		document.getElementById("canvas").appendChild(this.m_renderer.domElement);

		this.m_scene= new THREE.Scene();

		
		this.m_camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
		this.m_dummy = new THREE.Object3D;
		this.m_scene.add(this.m_dummy);

		var grid = new THREE.GridHelper(300, 10);
		this.m_scene.add(grid);
		
		this.m_camera.position.y=150;
		
		this.m_camera.lookAt(new THREE.Vector3(0,0,0));

		this.m_scene.add(this.m_camera);
		console.log(this.m_dummy.rotation);
		var light = new THREE.AmbientLight( 0x404040 ); // soft white light
		this.m_scene.add( light );
		this.m_terrain = new Mesh(this.m_scene);

	}

	//redesign me!
	orbitCamera() : void
	{
		var temp = Math.cos(this.m_angleY*Math.PI/180)*this.m_cameraDistance;
		var X = Math.sin(this.m_angleX*Math.PI/180)*temp;
		var Y = Math.sin(this.m_angleY*Math.PI/180)*this.m_cameraDistance;
		var  Z = Math.cos(this.m_angleX*Math.PI/180)*temp;
		this.m_camera.position.x = X;
		this.m_camera.position.y = Y;
		this.m_camera.position.z = Z;
		this.m_camera.lookAt(new THREE.Vector3(0,0,0));
	}

	run(): void
	{
		requestAnimationFrame(() => this.run());
		this.m_renderer.render(this.m_scene, this.m_camera);
		RenderScene.getInstance().renderToTexture(this.m_renderer);
		
		//this.m_terrain.render(this.m_renderer, this.m_scene, this.m_camera);

		this.orbitCamera();
		var mouseX:number = this.m_keylistener.getMouseX();
		var mouseY:number = this.m_keylistener.getMouseY();
		//if we have right click rotate the camera around the origin
		if(this.m_keylistener.getRightMouseButtonDown())
 		{
			if(this.m_mouseOldX != mouseX)
			{
				this.m_angleX += (this.m_mouseOldX - mouseX);
				if (this.m_angleX >= 360) this.m_angleX -= 360;
				else if (this.m_angleX < 0) this.m_angleX += 360;
				this.m_mouseOldX = mouseX;
			}

			if(this.m_mouseOldY != mouseY)
			{
				this.m_angleY += (this.m_mouseOldY - mouseY);
				if (this.m_angleY >= 360) this.m_angleY -= 360;
				else if (this.m_angleY < 0) this.m_angleY += 360;
				this.m_mouseOldY = mouseY;				
			}
			
		}
		else
		{
			//This is to avoid the 'jumping' issue if you move your mouse a lot
			this.m_mouseOldX = mouseX;
			this.m_mouseOldY = mouseY;			
		}
		if(this.m_keylistener.getMouseWheel() != 0)
		{
			this.m_cameraDistance += this.m_keylistener.getMouseWheel();
			//see keylistener class
			this.m_keylistener.resetMouseWheel();
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
