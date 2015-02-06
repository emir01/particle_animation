(function(particle){

	particle.engine_eventprocessing = function(){

		/*
			============================================================
			Public API
			============================================================
		*/

		var handleEventProcessing = function(canvasStrokeHandler){
			while(particle.eventpooling.HasMoreEvents()){
				var event = particle.eventpooling.GetNextEvent();

				// process the event
				if(event != null){
					if(event.eventType == "click" || event.eventType == "mousemove"){
						canvasStrokeHandler(event);
					}
				}

				// release the event
				particle.eventpooling.SetEventAsProcessed(event);
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
})(window.particle = window.particle || {} );