//I'm aware that singletons in typescript are usually defined with a
//namespace, but I want the constructor in this case


// -- Warning, raw javascript here --
//TODO - make a wrapper for dat gui in typescript
declare var dat : any;


module UI
{

	//make this private
	class propertiesPanel
	{
		color : string;
		size : number;
		opacity : number;
		constructor()
		{
			this.color="#00ff00";
			this.size = 20;
			this.opacity = 1.0;
		}
		public getColor() : string
		{
			return this.color;
		}
		public getSize() : number
		{
			return this.size;
		}
		public getOpacity() : number
		{
			return this.opacity;
		}
	}

	export class UISingleton
	{

		private static m_instance: UISingleton = new UISingleton();

		panel : propertiesPanel;
		
		constructor()
		{
			var gui = new dat.GUI();
			this.panel = new propertiesPanel();

			gui.addColor(this.panel, 'color');
			gui.add(this.panel, 'size', 1, 200);
			gui.add(this.panel, 'opacity', 0.1, 1.0);
		}

		public getColor() : string
		{
			var ret = this.panel.color;
			//ret = ret.replace('#', '0x');
			return ret;
		}
		public getSize() : number
		{
			return this.panel.getSize();
		}
		public getOpacity() : number
		{
			return this.panel.getOpacity();
		}

		public static getInstance() : UISingleton
		{
			return this.m_instance;
		}

		
	}
}
