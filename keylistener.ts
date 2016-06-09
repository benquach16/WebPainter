

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

	}

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

	getLeftMouseButtonDown() : boolean
	{
		return this.m_leftMouseButton;
	}

	getRightMouseButtonDown() : boolean
	{
		console.log(this.m_rightMouseButton);
		return this.m_rightMouseButton;
	}
}
