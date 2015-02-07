(function(drawing){

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

				removeFromStrokesAfterDraw:true,

				isAnimating:true,
				animationFrames:10,

				animateIt:function(){
					var me = this;

					me.y = me.y+0.2;
					me.x = me.x-0.1;

					me.animationFrames = me.animationFrames - 1;

					if(me.animationFrames <= 0){
						me.isAnimating = false;
					}
				},

				drawIt:function(ctx){
					var me = this;
					if(me.invoke=="Rect"){
						drawing.draw.Rect(ctx, me.x, me.y, me.w, me.h, me.fillStyle)
					}
					else if(me.invoke == "Circle"){
						drawing.draw.Circle(ctx, me.x, me.y, me.w, me.fillStyle)
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
	window.drawing.brushManager.RegisterBrush(brush, brush.Name);

})(window.drawing = window.drawing || {} );