(function(particle){

	var game = {
		
	};

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	game.canvas = canvas;
	game.ctx = ctx;

	particle.event.setup(game);
	particle.engine.setup(game);

	particle.game = game;

	// where the game loop is setup
	particle.draw.Clear(game.ctx);
	particle.test.run();

})(window.particle = window.particle || {});