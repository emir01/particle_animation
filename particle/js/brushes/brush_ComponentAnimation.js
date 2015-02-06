(function(particle){

	// Define the brush and register it via the burh collection
	var brush = (function(){

		/*
			Properties
			=============================================
		*/

		var name = "Component Animated";

		/*
			Public API
			=============================================
		*/		

		getBrushStroke = function(event){
			var brushStroke = {
				components:[],
				IsComposite:true,

				isAnimating:true,
				animationFrames:10,

				removeFromStrokesAfterDraw:true,

				drawIt:function(ctx){
					for (var i = this.components.length - 1; i >= 0; i--) {
						var comp = this.components[i];
						comp.drawIt(ctx);
					};
				},

				animateIt:function(){
					var comps = this.components;

					for (var i = comps.length - 1; i >= 0; i--) {
						var comp = comps[i];
						if(comp.isAnimating){
							comp.animateIt();
						}
					};

					this.animationFrames = this.animationFrames - 1;

					if(this.animationFrames<=0){
						this.isAnimating = false;
						
						for (var j = comps.length - 1; j >= 0; j--) {
							comps[j].isAnimating = false;
						};
					}
				}
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

				x:event.event.offsetX, 
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
						particle.draw.Rect(ctx, me.x, me.y, me.w, me.h, me.fillStyle)
					}
					else if(me.invoke == "Circle"){
						particle.draw.Circle(ctx, me.x, me.y, me.w, me.fillStyle)
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