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

			processEventQueue();
		};

		var animateBrushStrokes = function(){
			for (var i = entities.length - 1; i >= 0; i--) {
				var e = entities[i];

				if(e.type="brushComponent" && e.isAnimating){
					// animation frames is rudimentary system for particle
					// animation timings
					if(e.animationFrames > 0){
						e.animationFunction(e);
					}
				}
			}
		}

		var processEventQueue = function(){

			while(particle.event.HasMoreEvents()){
				var event = particle.event.GetNextEvent();

				// process the event
				if(event != null){
					if(event.eventType == "click" || event.eventType == "mousemove"){
						handleClickOnCanvas(event);
					}
				}

				// release the event
				particle.event.SetEventAsProcessed(event);
			}
		};

		var handleClickOnCanvas = function(event){
			// get the active brush and get the brush stroke
			// and add the brush components to the entities to be drawn
			var activeBrush = particle.brushManager.GetActiveBrush()
			var stroke = activeBrush.GetsBrushStroke(event);

			entities = entities.concat(stroke.components);
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
			RMP
			============================================================
		*/

		return{
			run:run
		}
	}();
})(window.particle = window.particle || {} );