(function(particle){
	particle.engine = function(){

		var entities = [];

		var run = function(){
			// run the loop

			requestAnimFrame(run);

			var game = particle.game;

			var now = new Date().getTime();
			game.last = now;
			game.dt = now - game.last;
			
			if(game.dt > 1000){
				game.dt = 1;
			}

			// process events and update animations
			update();

			// run drawing code on the animation or draw canvases
			// but first clear the animation canvas
			particle.draw.Clear(particle.game.actx, true);
			draw();
		}

		/*
			============================================================
			Update And Methods
			============================================================
		*/

		var update = function(){
			animateBrushStrokes();
			updateProcessEvents();
		};

		var animateBrushStrokes = function(){
			for (var i = entities.length - 1; i >= 0; i--) {
				var e = entities[i];

				if(e.type="brushComponent" && e.isAnimating){
					// animation frames is rudimentary system for particle
					// animation timings
					if(e.animationFrames > 0){
						e.y = e.y-2;

						e.x = e.x+2;

						e.animationFrames = e.animationFrames - 1;

						if(e.animationFrames <= 0){
							e.isAnimating = false;
						}
					}
				}
			};
		}

		var updateProcessEvents = function(){

			while(particle.event.HasMoreEvents()){
				var event = particle.event.GetNextEvent();

				// process the event
				if(event != null){
					console.log("Processing event of type " +event.eventType);

					if(event.eventType == "click" || event.eventType == "mousemove"){
						handleClickOnCanvas(event);
					}
				}

				// release the event
				particle.event.SetProcessedEvent(event);
			}
		};

		var handleClickOnCanvas = function(event){
			// get the current stroke components and add them to entities
			// to be drawn
			var strokeComponents = getBaseBrushStroke(event);
			entities = entities.concat(strokeComponents);
		};

		/*
			============================================================
			Draw methods
			============================================================
		*/

		var draw = function(){
			// draw  everything in entities
			for (var i = entities.length - 1; i >= 0; i--) {
				var e = entities[i];

				var ctx = particle.game.dctx;

				if(e.isAnimating){
					ctx = particle.game.actx;
				}

				if(e.invoke == "Rect"){
					particle.draw.Rect(ctx, e.x, e.y, e.w, e.h, e.fillStyle)
				}
				else if (e.invoke == "Circle"){
					particle.draw.Circle(ctx, e.x, e.y, e.w, e.fillStyle)
				}

				// the entity is going to be removed from the draw pool
				// if its set to be removed and its not animating
				if(e.remove && !e.isAnimating){
					entities.splice(i,1);
				}
			};
		};

		/*
			============================================================
			Utilities
			============================================================
		*/

		/*
			Return a collection of "stuff" to draw as part of the current brush stroke.

			Params:
			event - the event 
		*/

		var getBaseBrushStroke  = function(event){
			var strokeComponents = [];

			var strokeCore = getBrushComponent(event)
			var strokeAddonOne = getBrushComponent(event);
			var strokeAddonTwo = getBrushComponent(event);

			strokeAddonOne.y = strokeCore.y+2;
			strokeAddonOne.x = strokeCore.x+2;

			strokeAddonTwo.y = strokeCore.y-2;
			strokeAddonTwo.x = strokeCore.x-2;

			// the stroke core will not be animated
			strokeCore.isAnimating = false;

			strokeComponents.push(strokeCore);
			strokeComponents.push(strokeAddonOne);
			strokeComponents.push(strokeAddonTwo);

			return strokeComponents;
		};
		
		/*
			Return a drawable entity from an event. (Event for positioning)
		*/

		var getBrushComponent = function(event){
			var invoke = "Rect";

			if(Math.random() < 0.9){
				invoke = "Circle";
			}

			// randomize the method invocation
			var entity = {
				type:"brushComponent",
				x:event.event.offsetX, // the wrong coordinates
				y:event.event.offsetY,
				w:Math.round(Math.random() * 5),
				h:Math.round(Math.random() * 5),
				fillStyle:'#'+(Math.random()*0xFFFFFF<<0).toString(16),
				invoke:invoke,
				remove:true,

				isAnimating:true,
				animationFrames:20,
			};

			return entity;
		};

		/*
			============================================================
			RMP
			============================================================
		*/

		return{
			run:run
		}
	}();
})(window.particle = window.particle || {} );