(function(particle){

	// Define the brush and register it via the burh collection
	var brush = (function(){

		/*
			Properties
			=============================================
		*/

		var name = "Color Splatter";


		/*
			Public API
			=============================================
		*/		

		getBrushStroke = function(event){
			var brushStroke = {
				components:[]
			};

			// get the base components
			var strokeCore = getBrushComponent(event)
			var strokeAddonOne = getBrushComponent(event);
			var strokeAddonTwo = getBrushComponent(event);

			// modify base components properties
			strokeAddonOne.y = strokeCore.y+2;
			strokeAddonOne.x = strokeCore.x+2;

			strokeAddonTwo.y = strokeCore.y-2;
			strokeAddonTwo.x = strokeCore.x-2;


			// the stroke core will not be animated
			strokeCore.isAnimating = false;

			brushStroke.components.push(strokeCore);
			brushStroke.components.push(strokeAddonOne);
			brushStroke.components.push(strokeAddonTwo);

			return brushStroke;
		};

		/*
			Private Methods
			=============================================
		*/		

		/* return a single component in the current brush stroke*/

		var getBrushComponent = function(event){

			// setup random draw invocation code
			var invoke = "Rect"

			// randomize the method invocation
			if(Math.random() < 0.9){
				invoke = "Circle";
			}

			var component = {
				type:"brushComponent",

				x:event.event.offsetX, // the wrong coordinates
				y:event.event.offsetY,

				w:Math.round(Math.random() * 5),
				h:Math.round(Math.random() * 5),
				fillStyle:'#'+(Math.random()*0xFFFFFF<<0).toString(16),
				invoke:invoke,
				remove:true,

				isAnimating:true,
				animationFrames:10,

				animationFunction:function(me){
					me.y = me.y+0.2;

					me.x = me.x-0.1;

					me.animationFrames = me.animationFrames - 1;

					if(me.animationFrames <= 0){
						me.isAnimating = false;
					}
				}
			};

			return component;
		};

		/*
			RMP
			=============================================
		*/		

		return{
			Name:name,
			GetsBrushStroke:getBrushStroke,
		};
	})();
	
	// register the brush with the brush collection
	window.particle.brushManager.RegisterBrush(brush, brush.Name);

})(window.particle = window.particle || {} );