///<reference path="./three.d.ts"/>

class Mesh
{
	m_mesh: THREE.Mesh;
	m_geometry: THREE.PlaneGeometry;
	m_material: THREE.MeshBasicMaterial;
	m_scene: THREE.Scene;
	constructor(_scene)
	{
		this.m_geometry = new THREE.PlaneGeometry(5, 20, 32);
		
		this.m_mesh = new THREE.Mesh(this.m_geometry);
		_scene.add(this.m_mesh);
	}

	render(_renderer, _scene, _camera)
	{
		console.log("test");
		_renderer.render(_scene, _camera);
	}
	
}
