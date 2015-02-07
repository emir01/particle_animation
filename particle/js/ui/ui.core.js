/*
	The main entry point to the UI setup functionality for the drawing app

	It is to be loaded just before engine.
	-- possibly thing about even loading after engine

	It propagates events directly to all other submodules and even maybe engine.
*/

(function(drawing){
	drawing.ui_core = function(){

		/*
			============================================================
			Properties
			============================================================
		*/
		var key_codes = {
			One:49,
			Two:50,
			Three:51
		};

		/*
			============================================================
			Init
			============================================================
		*/

		var initUi = function(){
			
			//printBrushSelection();

			setupKeyboardHandlers();

			setupUIHandlers();
		};

		/*
			============================================================
			Keyboard handlers
			============================================================
		*/

		var setupKeyboardHandlers = function(){
			// hook the events on window
			$(window).on("keydown",function(e){

				if(e.which == key_codes.One ){
					ui_action_ClearCanvas_handler();
				}

				if(e.which == key_codes.Two ){
					ui_action_brush_circles_handler();
				}

				if(e.which == key_codes.Three ){
					ui_action_brush_squares_handler();
				}
			});
		};


		/*
			============================================================
			UI Handlers
			============================================================
		*/

		var setupUIHandlers = function(){
			// setup clear canvas handler
			$("#ui_action_clearCanvas").on("click", ui_action_ClearCanvas_handler);

			// setup circles brush
			$("#ui_action_brush_circles").on("click", ui_action_brush_circles_handler);

			// setup squares brush
			$("#ui_action_brush_squares").on("click", ui_action_brush_squares_handler);

		};

		/*
			============================================================
			Event Handlerss
			============================================================
		*/

		var ui_action_ClearCanvas_handler = function(){
			drawing.engine.clear();
		};

		var ui_action_brush_circles_handler = function(){
			drawing.brushManager.SetActiveBrush(drawing.brushManager.BrushNames.color_splatter);
		};

		var ui_action_brush_squares_handler = function(){
			drawing.brushManager.SetActiveBrush(drawing.brushManager.BrushNames.component_animated);	
		};

		/*
			============================================================
			Private Utilities
			============================================================
		*/

		/*
			============================================================
			RMP
			============================================================
		*/
		return {
			InitUi:initUi
		}

	}();
})(window.drawing = window.drawing || {} );
