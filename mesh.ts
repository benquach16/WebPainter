///<reference path="./three.d.ts"/>

class Mesh
{
	m_mesh: THREE.Mesh;
	m_geometry: THREE.PlaneGeometry;
	//m_geometry: THREE.SphereGeometry;
	m_material: THREE.MeshBasicMaterial;
	m_scene: THREE.Scene;

	m_splatShader: THREE.ShaderMaterial;

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
	}

	paint(_point: THREE.Vector2, _camera: THREE.Camera, _renderer) : void
	{

		var raycaster : THREE.Raycaster = new THREE.Raycaster();

		raycaster.setFromCamera(_point, _camera);
		var intersects = raycaster.intersectObject(this.m_mesh);

		
		if(intersects.length > 0)
			console.log(intersects);

		var imageData = _renderer.domElement.toDataURL();

		//try to load imageData?

		var tex = new THREE.TextureLoader().load(imageData);
		console.log(tex);

		var material : THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial(
			{
				map:imageData
			});

		var t=	<THREE.MeshBasicMaterial>this.m_mesh.material;
		t.map = tex;
		t.needsUpdate=true;
		
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
