

class KeyListener
{
	m_leftMouseButton: boolean;
	m_rightMouseButton: boolean;
	
	constructor()
	{
		this.m_leftMouseButton = false;
		this.m_rightMouseButton = false;
		var canvas = document.getElementById('content');

		canvas.addEventListener("mousedown", this.mouseDown, false);
	}

	mouseDown()
	{
		console.log("button pressed");
	}

	mouseUp()
	{
		console.log("button released");
	}
}
