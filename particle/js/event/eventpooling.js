/*
	Module responsible for setting up and pooling events in the event queue on the event canvas
*/
(function(drawing){
	/*
		The main event module
	*/
	drawing.eventpooling = function(){

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

		var setup = function(state){

			//setup a pub sub event handling framework
			// and register all valid drawing events

			// register click event
			$(state.evnt_canvas).on('click', clickEventHandler)

			$(state.evnt_canvas).on('mousedown', startMouseDownEventHandler);
			$(state.evnt_canvas).on('mouseup', endMouseDownEventHandler);
			$(state.evnt_canvas).on('mousemove', mouseMoveEventHandler);
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

		var setEventAsProcessed = function(event){
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
			SetEventAsProcessed:setEventAsProcessed
		}
	}();


})(window.drawing = window.drawing || {} );