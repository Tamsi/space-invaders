var PreloaderStage = {
	preload : function(){

		this.game.load.image("fond", "assets/vaisseau.jpg")
		this.game.load.image("player", "assets/player.png", 36, 20);
		this.game.load.image("firstInvader", "assets/firstinvader.png", 130, 86);
	},

    create : function(){
    	console.log("e");
        this.game.state.start("MainMenu");
    }

}
