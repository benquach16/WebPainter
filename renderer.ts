///<reference path="./mesh.ts"/>
///<reference path="./keylistener.ts"/>
///<reference path="./three.d.ts"/>

class Renderer
{
	m_renderer: THREE.WebGLRenderer;
	m_scene: THREE.Scene;
	m_camera: THREE.Camera;
	m_terrain: Mesh;
	m_keylistener: KeyListener;

	m_originPoint: THREE.Vector3;

	m_mouseX: number;
	m_mouseY: number;

	constructor()
	{

		//create things
		this.m_keylistener = new KeyListener();
		this.m_renderer = new THREE.WebGLRenderer();
		this.m_renderer.setSize(1000,800);
		this.m_renderer.setClearColor(0x6655FF,1);
		this.m_originPoint = new THREE.Vector3(0,0,0);
		
		document.getElementById('content').appendChild(this.m_renderer.domElement);

		this.m_renderer.clear();
		this.m_scene = new THREE.Scene();
		this.m_camera = new THREE.PerspectiveCamera(75, 1,0.1,1000);
		this.m_camera.position = new THREE.Vector3(0,0,100);
		this.m_camera.lookAt(new THREE.Vector3(0,0,0));

		
		this.m_terrain = new Mesh(this.m_scene);
		
	}

	run()
	{
		requestAnimationFrame(() => this.run());
		this.m_renderer.render(this.m_scene, this.m_camera);
		//this.m_terrain.render(this.m_renderer, this.m_scene, this.m_camera);
		//if we have right click rotate the camera around the origin

		if(this.m_keylistener.getRightMouseButtonDown())
		{
			//rotate camera around origin
		}
	}

	
}
