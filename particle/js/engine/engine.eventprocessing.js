(function(drawing){

	drawing.engine_eventprocessing = function(){

		/*
			============================================================
			Public API
			============================================================
		*/

		var handleEventProcessing = function(canvasStrokeHandler){
			while(drawing.eventpooling.HasMoreEvents()){
				var event = drawing.eventpooling.GetNextEvent();

				// process the event
				if(event != null){
					if(event.eventType == "click" || event.eventType == "mousemove"){
						canvasStrokeHandler(event);
					}
				}

				// release the event
				drawing.eventpooling.SetEventAsProcessed(event);
			}
		};

		/*
			============================================================
			RMP
			============================================================
		*/

		return {
			HandleEventProcessing:handleEventProcessing

		}
	}();
})(window.drawing = window.drawing || {} );