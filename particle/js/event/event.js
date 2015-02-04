(function(particle){

	/*
		The main event module
	*/
	particle.event = function(){

		/* 	
			Properties
			--------------------------------
		*/

		var eventQueue = [];

		var subs = [];

		var mouseDownFireInterval = 10;

		/* 	
			Setup
			--------------------------------
		*/

		var setup = function(game){

			//setup a pub sub event handling framework
			// and register all valid game events

			console.log("Setup Event");

			// register click event
			$(game.evnt_canvas).on('click', clickEventHandler)

			$(game.evnt_canvas).on('mousedown', startMouseDownEventHandler);
			$(game.evnt_canvas).on('mouseup', endMouseDownEventHandler);
			$(game.evnt_canvas).on('mousemove', mouseMoveEventHandler);
		}

		/* 	
			Internal Handlers
			--------------------------------
		*/

		/*
			Mouse movement related event handlers
			====================================================
		*/

		var mouseIsDown = false;

		var startMouseDownEventHandler = function(){
			mouseIsDown = true;
		};

		var endMouseDownEventHandler = function(){
			mouseIsDown = false;
		};

		var mouseMoveEventHandler = function(event){
			if(mouseIsDown){
				 eventQueue.push({
			 		eventType:'mousemove',
			 		event:event
			 	});
		 	}
		};

		/*
			The mouse click event handler
			====================================================
		*/

		var clickEventHandler = function(event){
			eventQueue.push({
			 	eventType:'click',
			 	event:event
			 });
		};

		/* 	
			Public Methods
			--------------------------------
		*/

		var hasMoreEvents = function(){
			if(eventQueue.length == 0){
				return false;
			}
			else{
				return true;
			}
		};

		var getNextEvent = function(){
			if(!hasMoreEvents()){
				return null;
			}
			else{
				return eventQueue[0];
			}
		};

		var setProcessedEvent = function(event){
			var index = eventQueue.indexOf(event);
			eventQueue.splice(index, 1);
		};

		/* 	
			RMP
			--------------------------------
		*/		

		return{
			// initial setup
			setup:setup,

			// event queue operations
			HasMoreEvents:hasMoreEvents,
			GetNextEvent:getNextEvent,
			SetProcessedEvent:setProcessedEvent
		}
	}();


})(window.particle = window.particle || {} );