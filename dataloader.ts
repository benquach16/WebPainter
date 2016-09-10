//class intended to simply load a text file from an xhrrequest


namespace DataLoader
{
	export function readFile(_file : string)
	{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'shaders/vs_model.glsl', true);
		xhr.onreadystatechange=function()
		{
			console.log("fuck");
		}
		xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); 
		xhr.send(null);
	}
}
