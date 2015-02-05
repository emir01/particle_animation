(function(particle){

	var game = {};

	// get the draw canvas
	var draw_canvas = document.getElementById('draw_canvas');
	var dctx = draw_canvas.getContext('2d');

	game.draw_canvas = draw_canvas;
	game.dctx = dctx;

	 // get the animation canvas
	var anim_canvas = document.getElementById('animation_canvas');
	var actx = anim_canvas.getContext('2d');

	game.anim_canvas = anim_canvas;
	game.actx = actx;

	// get the background canvas
	var back_canvas = document.getElementById('background_canvas');
	var bctx = back_canvas.getContext('2d');

	game.back_canvas = back_canvas;
	game.bctx = bctx;

	// get the event canvas
	var evnt_canvas = document.getElementById('event_canvas');
	var ectx = evnt_canvas.getContext('2d');

	game.evnt_canvas = evnt_canvas;
	game.ectx = ectx;

	particle.event.setup(game);

	// namespace the core game object
	particle.game = game;

	// draw/clear initial background canvas
	particle.draw.Clear(game.bctx);

	// setup current brush
	particle.brushManager.SetActiveBrush(particle.brushManager.BrushNames.color_splatter);
	
	particle.engine.run();

})(window.particle = window.particle || {});