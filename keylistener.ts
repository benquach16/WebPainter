

class KeyListener
{
	m_leftMouseButton: boolean;
	m_rightMouseButton: boolean;
	m_mouseX: number;
	m_mouseY: number;
	constructor()
	{
		this.m_leftMouseButton = false;
		this.m_rightMouseButton = false;
		var canvas = document.getElementById('content');

		canvas.addEventListener("mousedown", this.mouseDown, false);
		canvas.addEventListener("mouseup", this.mouseUp, false);
		canvas.addEventListener("mousemove", this.mouseMove, false);
	}

	//event callback functions
	mouseDown = (event) =>
	{

		if(event.which==3)
		{
			console.log("right click");
			this.m_rightMouseButton = true;
		}
		else if(event.which==1)
		{
			console.log("left click");
			this.m_leftMouseButton = true;
		}
	}

	mouseUp = (event) =>
	{
		console.log("button released");
		if(event.which==3)
		{
			this.m_rightMouseButton = false;
		}
		else if(event.which ==1)
		{
			this.m_leftMouseButton = false;
		}
	}

	mouseMove = (event) =>
	{
		this.m_mouseX = event.clientX;
		this.m_mouseY = event.clientY;
	}

	getLeftMouseButtonDown() : boolean
	{
		return this.m_leftMouseButton;
	}

	getRightMouseButtonDown() : boolean
	{
		return this.m_rightMouseButton;
	}

	getMouseX() : number
	{
		return this.m_mouseX;
	}

	getMouseY() : number
	{
		return this.m_mouseY;
	}
}
