(function(particle){

	particle.test = function(){

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

			// clear the screen

			update();

			// not clearing on each anim frame because we do not want
			// to redraw brush strokes on each anim frame
			//particle.draw.Clear(game.ctx);

			draw();
		}

		/*
			============================================================
			Update And Methods
			============================================================
		*/

		var update = function(){
			updateProcessEvents();
		};

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
			// just add an enitity to the entity array at the given position

			// generate random entity
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

				if(e.invoke == "Rect"){
					particle.draw.Rect(particle.game.ctx, e.x, e.y, e.w, e.h, e.fillStyle)
				}
				else if (e.invoke == "Circle"){
					particle.draw.Circle(particle.game.ctx, e.x, e.y, e.w, e.fillStyle)
				}


				//  if the entity is marked for removal once it has been draw? 
				// NOTE: Entities must be removed becaues if not we will keep drawing them
				// and there is no need as the canvas i never cleared
				if(e.remove){
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

			var strokeCore = getDrawEntity(event)
			var strokeAddonOne = getDrawEntity(event);
			var strokeAddonTwo = getDrawEntity(event);

			strokeAddonOne.y = strokeCore.y+10;
			strokeAddonOne.x = strokeCore.x+10;

			strokeAddonTwo.y = strokeCore.y-10;
			strokeAddonTwo.x = strokeCore.x-10;

			strokeComponents.push(strokeCore);
			strokeComponents.push(strokeAddonOne);
			strokeComponents.push(strokeAddonTwo);

			return strokeComponents;
		};
		
		/*
			Return a drawable entity from an event. (Event for positioning)
		*/

		var getDrawEntity = function(event){

			var invoke = "Rect";

			if(Math.random() < 0.9){
				invoke = "Circle";
			}

			// randomize the method invocation
			var entity = {
				x:event.event.offsetX, // the wrong coordinates
				y:event.event.offsetY,
				w:Math.round(Math.random() * 5),
				h:Math.round(Math.random() * 5),
				fillStyle:'#'+(Math.random()*0xFFFFFF<<0).toString(16),
				invoke:invoke,
				remove:true
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