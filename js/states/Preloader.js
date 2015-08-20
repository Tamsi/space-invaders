

BasicGame.Preloader = function (game) {
};

BasicGame.Preloader.prototype = {

   preload : function(){

		this.game.load.image("fond", "assets/vaisseau.jpg")
		this.game.load.image("player", "assets/player.png");
		this.game.load.image("firstInvader", "assets/firstinvader.png");
		this.game.load.image("secondInvader", "assets/secondinvader.png");
		this.game.load.image("bullet", "assets/bullet.png");
		this.game.load.spritesheet("explosion", "assets/explosion.png", 32, 32);
	},

    create : function(){
        this.game.state.start("MainMenu");
    }
};