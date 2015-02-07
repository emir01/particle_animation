(function(drawing){

	drawing.engine_animations = function(){

		/*
			============================================================
			Public API
			============================================================
		*/
		var handleAnimations = function(strokes){
			for (var i = strokes.length - 1; i >= 0; i--) {
				var e = strokes[i];

				if(e.type="brushComponent" && e.isAnimating){
					// animation frames is rudimentary system for drawing
					// animation timings
					if(e.animationFrames > 0){
						e.animateIt();
					}
				}
			}
		};

		/*
			============================================================
			RMP
			============================================================
		*/

		return {
			HandleAnimations:handleAnimations
		}
	}();
})(window.drawing = window.drawing || {} );