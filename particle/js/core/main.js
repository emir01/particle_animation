(function(drawing){

	var state = {};

	// get the draw canvas
	var draw_canvas = document.getElementById('draw_canvas');
	var dctx = draw_canvas.getContext('2d');

	state.draw_canvas = draw_canvas;
	state.dctx = dctx;

	 // get the animation canvas
	var anim_canvas = document.getElementById('animation_canvas');
	var actx = anim_canvas.getContext('2d');

	state.anim_canvas = anim_canvas;
	state.actx = actx;

	// get the background canvas
	var back_canvas = document.getElementById('background_canvas');
	var bctx = back_canvas.getContext('2d');

	state.back_canvas = back_canvas;
	state.bctx = bctx;

	// get the event canvas
	var evnt_canvas = document.getElementById('event_canvas');
	var ectx = evnt_canvas.getContext('2d');

	state.evnt_canvas = evnt_canvas;
	state.ectx = ectx;

	drawing.eventpooling.setup(state);

	// namespace the core state object
	drawing.state = state;

	// draw/clear initial background canvas
	drawing.draw.Clear(state.bctx);

	// setup current brush
	drawing.brushManager.SetActiveBrush(drawing.brushManager.BrushNames.component_animated);
	
	drawing.engine.run();

})(window.drawing = window.drawing || {});