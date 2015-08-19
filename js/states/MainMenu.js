BasicGame.MainMenu = function (game) {
};

BasicGame.MainMenu.prototype = {

    create : function(){
    	var title;
    	var pressButton;

        this.game.add.image(0, 0, "fond");
        title = this.game.add.text(this.game.world.centerX, 100, "Space Invaders", {font: "32px Arial", fill: "#ffffff"});
        title.anchor.set(0.5);
        pressButton = this.game.add.text(this.game.world.centerX, 500, 'Press "P" to play', {font: "32px Arial", fill: "#ffffff"});
        pressButton.anchor.set(0.5);

        this.pkey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.pkey.onDown.add(this.go, this);
        this.game.state.start("Game");
    },

    go : function(){

    	this.game.state.start("Game");
    }

};
