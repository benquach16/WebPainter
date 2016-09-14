//I'm aware that singletons in typescript are usually defined with a
//namespace, but I want the constructor in this case

declare var dat : any;
class UISingleton
{

	private static m_instance: UISingleton = new UISingleton();
	
	constructor()
	{
		var gui = new dat.GUI();
	}
}
