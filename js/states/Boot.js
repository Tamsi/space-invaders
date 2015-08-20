var BasicGame = {};

BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

    create : function(){
    	
        this.game.state.start("Preloader");
    }

};