

BasicGame.Preloader = function (game) {
};

BasicGame.Preloader.prototype = {

   preload : function(){

		this.game.load.image("fond", "assets/vaisseau.jpg")
		this.game.load.image("player", "assets/player.png", 36, 20);
		this.game.load.image("firstInvader", "assets/firstinvader.png", 130, 86);
		this.game.load.image("bullet", "assets/bullet.png");
		this.game.load.spritesheet("explosion", "assets/explosion.png", 130, 86);
	},

    create : function(){
        this.game.state.start("MainMenu");
    }
};