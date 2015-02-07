(function(drawing){
	drawing.engine = function(){

		/*
			============================================================
			Strokes
			============================================================
		*/

		var strokes = [];

		/*
			============================================================
			Main Engine Loop
			============================================================
		*/

		var run = function(){
			requestAnimFrame(run);

			handleTimings();

			// process events and update animations
			update();

			// run drawing code on the animation or draw canvases
			// but first clear the animation canvas
			drawing.draw.Clear(drawing.state.actx, true);

			draw();
		};

		/*	
			Handle Engine Timings constraints, for animation frequency
		*/

		var handleTimings = function(state) {
			var state = drawing.state;

			var now = new Date().getTime();
			state.last = now;
			state.dt = now - state.last;
			
			if(state.dt > 1000){
				state.dt = 1;
			}
		};

		/*
			============================================================
			Update
			============================================================
		*/

		var update = function(){
			drawing.engine_animations.HandleAnimations(strokes);
			drawing.engine_eventprocessing.HandleEventProcessing(handleStrokeOnCanvas);
		};

		var handleStrokeOnCanvas = function(event){
			// get the active brush and get the brush stroke
			// and add the brush components to the strokes to be drawn
			var activeBrush = drawing.brushManager.GetActiveBrush()

			var stroke = activeBrush.GetsBrushStroke(event);

			// if the stroke is not composite add all the 
			// internal components separatly
			if(!stroke.IsComposite){
				strokes = strokes.concat(stroke.components);
			}
			else{
				// if the stroke is a composite add the entire stroke object 
				// which provides the component based API for drawing and animation 
				// and will internally manage its components
				strokes = strokes.concat(stroke);
			}
		};

		/*
			============================================================
			Draw
			============================================================
		*/

		var draw = function(){
			//draw all current strokes
			for (var i = strokes.length - 1; i >= 0; i--) {
				var e = strokes[i];

				var ctx = drawing.state.dctx;

				if(e.isAnimating){
					ctx = drawing.state.actx;
				}
				
				e.drawIt(ctx);

				// the entity is going to be removed from the draw pool
				// if its set to be removed and its not animating
				if(e.removeFromStrokesAfterDraw && !e.isAnimating){
					console.log("Splicing component");
					strokes.splice(i,1);
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
})(window.drawing = window.drawing || {} );