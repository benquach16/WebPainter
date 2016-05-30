///<reference path="./three.d.ts"/>

class Mesh
{
	m_mesh: THREE.Mesh;
	m_geometry: THREE.PlaneGeometry;
	//m_geometry: THREE.SphereGeometry;
	m_material: THREE.MeshLambertMaterial;
	m_scene: THREE.Scene;
	constructor(_scene)
	{
		this.m_geometry = new THREE.PlaneGeometry(5, 20, 32);
		//this.m_geometry = new THREE.SphereGeometry(50,16,16);

		this.m_material =
			new THREE.MeshLambertMaterial(
				{
					color: 0xCCCC00
				});
		this.m_mesh = new THREE.Mesh(this.m_geometry, this.m_material);
		_scene.add(this.m_mesh);
	}

	//this is not necessary
	render(_renderer, _scene, _camera)
	{

		_renderer.render(_scene, _camera);
	}
	
}
