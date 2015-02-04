(function(particle){

	particle.engine = function(){
		
		var setup = function(game){
			console.log("Setup Engine");
		}

		return{
			setup:setup
		}
	}();


})(window.particle = window.particle || {} );