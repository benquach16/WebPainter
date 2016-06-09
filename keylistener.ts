

class KeyListener
{
	static m_leftMouseButton: boolean;
	static m_rightMouseButton: boolean;
	m_mouseX: number;
	m_mouseY: number;
	constructor()
	{
		KeyListener.m_leftMouseButton = false;
		KeyListener.m_rightMouseButton = false;
		var canvas = document.getElementById('content');

		canvas.addEventListener("mousedown", this.mouseDown, false);
		canvas.addEventListener("mouseup", this.mouseUp, false);

	}

	mouseDown(event)
	{

		if(event.which==3)
		{
			console.log("right click");
			KeyListener.m_rightMouseButton = true;
		}
		else if(event.which==1)
		{
			console.log("left click");
			KeyListener.m_leftMouseButton = true;
		}
	}

	mouseUp(event)
	{
		console.log("button released");
		if(event.which==3)
		{
			KeyListener.m_rightMouseButton = false;
		}
		else if(event.which ==1)
		{
			KeyListener.m_leftMouseButton = false;
		}
	}

	getLeftMouseButtonDown() : boolean
	{
		return KeyListener.m_leftMouseButton;
	}

	getRightMouseButtonDown() : boolean
	{
		return KeyListener.m_rightMouseButton;
	}
}
