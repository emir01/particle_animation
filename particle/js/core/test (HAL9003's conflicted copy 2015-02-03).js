(function(particle){

	particle.test = function(){

		var run = function(){
			// run the loop

			requestAnimFrame(run);

			var game = particle.game;

			var now = new Date().getTime();
			game.last = now;
			game.dt = now - game.last;
			
			if(game.dt > 1000){
				game.dt = 1;
			}

			// clear the screen
			particle.draw.Clear(game.ctx);

			
		}

		return{
			run:run
		}
	}();


})(window.particle = window.particle || {} );