(function(particle){

	particle.event = function(){

		var setup = function(game){
			console.log("Setup Event");
		}

		return{
			setup:setup
		}
	}();


})(window.particle = window.particle || {} );