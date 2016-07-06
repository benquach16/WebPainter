///<reference path="./three.d.ts"/>

class Mesh
{
	m_mesh: THREE.Mesh;
	m_geometry: THREE.PlaneGeometry;
	//m_geometry: THREE.SphereGeometry;
	m_material: THREE.MeshBasicMaterial;
	m_scene: THREE.Scene;

	m_splatShader: THREE.ShaderMaterial;

	m_renderCamera : THREE.OrthographicCamera;
	m_textureQuad : THREE.PlaneGeometry;
	m_renderScene : THREE.Scene;
	m_textureRenderTarget : THREE.WebGLRenderTarget;

	constructor(_scene)
	{
		this.m_geometry = new THREE.PlaneGeometry(100, 100, 32, 32);
		//this.m_geometry = new THREE.SphereGeometry(50,16,16);

		this.m_material =
			new THREE.MeshBasicMaterial(
				{
					color: 0xCCCC00
				});
		this.m_mesh = new THREE.Mesh(this.m_geometry, this.m_material);
		_scene.add(this.m_mesh);
		this.setupRenderScene();
	}

	//renderer as an argument is temporary!
	paint(_point: THREE.Vector2, _camera: THREE.Camera, _renderer) : void
	{

		var raycaster : THREE.Raycaster = new THREE.Raycaster();

		raycaster.setFromCamera(_point, _camera);
		var intersects = raycaster.intersectObject(this.m_mesh);

		
		if(intersects.length > 0)
			console.log(intersects);

		//var imageData = _renderer.domElement.toDataURL();

		//try to load imageData?

		//var tex = new THREE.TextureLoader().load(imageData);

		var material : THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial(
			{
				map:this.m_textureRenderTarget.texture
			});

		var t=	<THREE.MeshBasicMaterial>this.m_mesh.material;
		t.map = this.m_textureRenderTarget.texture;
		t.needsUpdate=true;
		
	}

	setupRenderScene() : void
	{
		//SETUP THE CAMERA AND THE QUAD RIGHT HERE
		this.m_renderCamera = new THREE.OrthographicCamera(-100,-100,100,100,1000);
		var geometry = new THREE.SphereGeometry(50,16,16);
		var material : THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial(
			{
				color:0xCC0000
			});
		var mesh = new THREE.Mesh(geometry, material);
		this.m_textureRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});
		
		this.m_renderScene = new THREE.Scene();
		this.m_renderScene.add(mesh);
		this.m_renderCamera.lookAt(new THREE.Vector3(0,0,0));
		this.m_renderCamera.position.z = 100;
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
