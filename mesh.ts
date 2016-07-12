///<reference path="./three.d.ts"/>
///<reference path="./renderscene.ts"/>

const RENDERSIZE : number = 500;

class Mesh
{
	m_mesh: THREE.Mesh;
	//m_geometry: THREE.PlaneGeometry;
	//m_geometry: THREE.SphereGeometry;
	m_geometry: THREE.Geometry;
	m_material: THREE.MeshBasicMaterial;
	m_scene: THREE.Scene;

	m_splatShader: THREE.ShaderMaterial;


	//All of this belongs to stuff related to the render to texture
	//m_renderCamera : THREE.PerspectiveCamera;
	m_renderCamera : THREE.OrthographicCamera;
	m_textureQuad : THREE.PlaneGeometry;
	m_renderScene : THREE.Scene;
	m_textureRenderTarget : THREE.WebGLRenderTarget;

	constructor(_scene)
	{
		//this.m_geometry = new THREE.PlaneGeometry(300, 300, 64, 64);
		var modelLoader = new THREE.JSONLoader();
		//this.m_geometry = new THREE.SphereGeometry(50,16,16);
		modelLoader.load("monkey.json", (geometry) => {
			// create a mesh using the passed in geometry and textures
			this.m_geometry = geometry;
			
		this.m_material =
			new THREE.MeshBasicMaterial(
				{
					color: 0xCCCC00
				});
		this.m_mesh = new THREE.Mesh(this.m_geometry, this.m_material);
		this.m_mesh.rotation.x = -Math.PI/2;
			_scene.add(this.m_mesh);
			//this.m_mesh.scale.set(20,20,20);
		});
		
		



		this.setupRenderScene();
	}

	//renderer as an argument is temporary!
	paint(_point: THREE.Vector2, _camera: THREE.Camera, _renderer) : void
	{

		var raycaster : THREE.Raycaster = new THREE.Raycaster();

		raycaster.setFromCamera(_point, _camera);
		var intersects = raycaster.intersectObject(this.m_mesh);

		
		if(intersects.length > 0)
		{

			//var imageData = _renderer.domElement.toDataURL();

			//try to load imageData?
			var t=	<THREE.MeshBasicMaterial>this.m_mesh.material;
			t.map = this.m_textureRenderTarget.texture;
			t.needsUpdate=true;
			
			var intersect = intersects[0];
			console.log(intersect.uv);

			//convert uv to real space coordinates of a nxn space
			//coordinates start at -RENDERSIZE -RENDERSIZE
			var x = intersect.uv.x;
			var y = intersect.uv.y;
			x = x * RENDERSIZE;
			x = x - (RENDERSIZE/2);
			y = y * RENDERSIZE;
			y = y - (RENDERSIZE/2);

		
			var geometry = new THREE.PlaneGeometry( 10, 10 );
			var material : THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial(
				{
					color:0x00FF00
				});
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = x;
			mesh.position.y = y;
			this.m_renderScene.add(mesh);
		}
		
	}

	setupRenderScene() : void
	{
		//SETUP THE CAMERA AND THE QUAD RIGHT HERE
		//this.m_renderCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
		this.m_renderCamera = new THREE.OrthographicCamera(-RENDERSIZE/2, RENDERSIZE/2, RENDERSIZE/2, -RENDERSIZE/2,-500,1000);
		this.m_renderCamera.position.z = 50;
		this.m_renderCamera.lookAt(new THREE.Vector3(0,0,0));

		
		var geometry = new THREE.PlaneGeometry( RENDERSIZE, RENDERSIZE );
		var material : THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial(
			{
				color:0xCC0000
			});
		var mesh = new THREE.Mesh(geometry, material);
		this.m_textureRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});
		
		this.m_renderScene = new THREE.Scene();
		this.m_renderScene.add(mesh);

	}
		

	renderToTexture(_renderer) : void
	{
		//render to rendertarget
		//_renderer.render(this.m_renderScene, this.m_renderCamera);
		_renderer.render(this.m_renderScene, this.m_renderCamera, this.m_textureRenderTarget);
	}

	

	loadTexture(_path: string) : void
	{
		
	}

	reloadTexture() : void
	{
		
	}

	saveTexture() : void
	{
		
	}
}
