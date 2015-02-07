(function(drawing){

	drawing.brushManager = function(){

		/*
			============================================================
			Properties
			============================================================
		*/

		var active_brush = null;

		var brushModules= [];

		var predefBrushNames = {
			color_splatter:"Color Splatter",
			component_animated:"Component Animated",
		};

		/*
			============================================================
			Brush API
			============================================================
		*/

		var registerBrush = function(brushModule, name){
			brushModules.push({
				name:name,
				brush:brushModule
			});
		};

		var setActiveBrush = function (name) {
			active_brush = findBrush(name);
		};

		var getActiveBrush = function(){
			return active_brush.brush;
		};

		/*
			============================================================
			Utilities
			============================================================
		*/

		/* Find a given brush in the list of brush modules */

		var findBrush = function(name){
			for (var i = brushModules.length - 1; i >= 0; i--) {
				var brush = brushModules[i];

				if(brush.name == name){
					return brush;
				}
			};

			return null;
		}

		/*
			============================================================
			RMP
			============================================================
		*/

		return {
			BrushNames:predefBrushNames,

			RegisterBrush:registerBrush,

			SetActiveBrush:setActiveBrush,
			GetActiveBrush:getActiveBrush,
		}
	}();
})(window.drawing = window.drawing || {} );