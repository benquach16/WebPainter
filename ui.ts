//I'm aware that singletons in typescript are usually defined with a
//namespace, but I want the constructor in this case


// -- Warning, raw javascript here --
//TODO - make a wrapper for dat gui in typescript
declare var dat : any;


module UI
{

	//make this private
	class colorPanel
	{
		color : string;
		constructor()
		{
			this.color="#00ff00";
		}
		public getColor() : string
		{
			return this.color;
		}
	}

	class sizePanel
	{
		size : number;
		constructor()
		{
			this.size = 20;
		}
		public getSize() : number
		{
			return this.size;
		}

	}

	export class UISingleton
	{

		private static m_instance: UISingleton = new UISingleton();

		cPanel : colorPanel;
		sPanel : sizePanel;
		constructor()
		{
			var gui = new dat.GUI();
			this.cPanel = new colorPanel();
			this.sPanel = new sizePanel();
			gui.addColor(this.cPanel, 'color');
			gui.add(this.sPanel, 'size', 1, 200);

		}

		public getColor() : string
		{
			var ret = this.cPanel.color;
			//ret = ret.replace('#', '0x');
			return ret;
		}
		public getSize() : number
		{
			return this.sPanel.getSize();
		}

		public static getInstance() : UISingleton
		{
			return this.m_instance;
		}

		
	}
}
