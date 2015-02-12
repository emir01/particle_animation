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
			Escape:27,
			One:49,
			Two:50
		};

		var action_types = {
			general:"general",
			brush:"brush",
		};

		/*
			============================================================
			Init
			============================================================
		*/

		var initUi = function(){
			drawUi();

			setupKeyboardHandlers();
		};

		/*
			============================================================
			UI Drawing
			============================================================
		*/

		var drawUi = function(){
			var $controls_wrapper = $("#controls-wrapper");

			// draw the ui form the  configuration
			 for (var i = 0; i < uiDefinition.length; i++) {
			 	var section = uiDefinition[i];

				// draw the section
			 	var $section = $("<div></div>")
			 		.addClass("controls-section");
				
			 	var $sectionTitle = $("<div></div>") 
			 		.addClass("section-title")
			 		.text(section.sectionName);

			 	var $sectionActions = $("<div></div>")
			 		.addClass("control-section-actions");

			 	// Compose all the actions in the control section actions 
			 	// wrapper
			 	for (var j = 0; j < section.sectionControls.length; j++) {
			 		var control = section.sectionControls[j];

			 		var $button = $("<button></button>")
			 			.addClass("action")
			 			.text(control.title)
			 			.on("click", control.handler);

		 			if(control.type == action_types.brush){
		 				$button.attr("alias", control.alias);
		 			}

			 		// add the button to the actions section wrapper
			 		$sectionActions.append($button);
			 	};

			 	// do high level composition
			 	$section.append($sectionTitle);
			 	$section.append($sectionActions);

			 	$controls_wrapper.append($section);
			};
		};

		/*
			============================================================
			Keyboard handlers
			============================================================
		*/

		var setupKeyboardHandlers = function(){
			// hook the events on window
			$(window).on("keydown",function(e){

				// need to check if the keycode is present in the array of
				// event handlers in the UI array definition in the properties

				var keyCode = e.which;

				// use underscore to get only the array of
				// controls without the section definitions
				var uiControls = _.chain(uiDefinition)
				.map(function(object){
					return object.sectionControls;
				})
				.flatten()
				.value();

				// find and call the handler in the array of uicontorls
				for (var i = uiControls.length - 1; i >= 0; i--) {
					var control = uiControls[i]
					if(control.keyCode == keyCode){
						// call the control handler
						control.handler(e);
					}
				};
			});
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
			setActiveBrush(drawing.brushManager.BrushNames.color_splatter);
		};

		var ui_action_brush_squares_handler = function(){
			drawing.brushManager.SetActiveBrush(drawing.brushManager.BrushNames.component_animated);	
			setActiveBrush(drawing.brushManager.BrushNames.component_animated);
		};

		/*
			============================================================
			UI Definition
			============================================================
		*/


		/*
			Define the entire scheme/control array that will be dynamicly
			added on the UI.

			The UI will be generated based on the given section
		*/

		var uiDefinition = [
			// section definition
			{
				sectionName: "Main",

				// section control definition
				sectionControls: [
					{ 
						type:action_types.general,
						title:"Clear Canvas (Esc)",
						keyCode:key_codes.Escape,
						handler:ui_action_ClearCanvas_handler
					}
				]
			},
			// section definition
			{
				sectionName:"Brushes",

				// section control definition
				sectionControls: [
					{
						type:action_types.brush,
						alias:drawing.brushManager.BrushNames.color_splatter,
						title:"Circle Brush (1)",
						keyCode:key_codes.One,
						handler:ui_action_brush_circles_handler
					},
					{
						type:action_types.brush,
						alias:drawing.brushManager.BrushNames.component_animated,
						title:"Square Brush (2)",
						keyCode:key_codes.Two,
						handler:ui_action_brush_squares_handler
					}
				]
			}
		];

		/*
			============================================================
			Utilities
			============================================================
		*/

		/* Let the ui set a given rendered brush selectio action as 
			the current active brush
		*/
		var setActiveBrush = function(brushAlias){
			console.log("setting active brush for alias: "+ brushAlias);
			$("button.active").removeClass("active");
			var nowActiveButton = $("button[alias = '"+brushAlias+"']");

			nowActiveButton.addClass("active");

		};

		/*
			============================================================
			RMP
			============================================================
		*/
		return {
			InitUi:initUi,

			SetActiveBrush:setActiveBrush
		}
	}();
})(window.drawing = window.drawing || {} );
