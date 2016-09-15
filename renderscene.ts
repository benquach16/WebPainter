///<reference path="./ui.ts"/>

//this is a singleton to render just the texture
//have to use a class in this case too

const RENDERSIZE : number = 1000;

class RenderScene
{

	private static m_instance: RenderScene = new RenderScene();
	
	m_renderCamera : THREE.OrthographicCamera;
	m_textureQuad : THREE.PlaneGeometry;
	m_renderScene : THREE.Scene;
	m_textureRenderTarget : THREE.WebGLRenderTarget;
	m_templateTexture : THREE.Texture;

	constructor()
	{

		//do singleton stuff
		RenderScene.m_instance = this;
		
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

		//load template texture
		this.m_templateTexture = THREE.ImageUtils.loadTexture("resources/template.png");
	}

	public renderToTexture(_renderer) : void
	{
		//render to rendertarget
		//_renderer.render(this.m_renderScene, this.m_renderCamera);
		_renderer.render(this.m_renderScene, this.m_renderCamera, this.m_textureRenderTarget);
	}

	//getter for singleton
	public static getInstance() : RenderScene
	{
		return this.m_instance;
	}
	//accessor for getting the render target
	public getRenderTexture(): THREE.WebGLRenderTarget
	{
		return this.m_textureRenderTarget;
	}

	//get uv coords and caculate the position
	public paint(_uv: THREE.Vector2)
	{
		
		//convert uv to real space coordinates of a nxn space
		//coordinates start at -RENDERSIZE -RENDERSIZE
		var x = _uv.x;
		var y = _uv.y;
		x = x * RENDERSIZE;
		x = x - (RENDERSIZE/2);
		y = y * RENDERSIZE;
		y = y - (RENDERSIZE/2);

		var size : number = UI.UISingleton.getInstance().getSize();
		var geometry = new THREE.PlaneGeometry( size, size );
		var colorObj = UI.UISingleton.getInstance().getColor();
		console.log(colorObj);
		var material : THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial(
			{
				color:UI.UISingleton.getInstance().getColor(),
				map: this.m_templateTexture,
				transparent: true
			});
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = x;
		mesh.position.y = y;
		this.m_renderScene.add(mesh);
	}
}
