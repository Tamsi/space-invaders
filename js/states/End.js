BasicGame.End = function (game) {
};

BasicGame.End.prototype = {

    create : function(){

    	var text;
    	var retry;

    	text = this.game.add.text(this.game.world.centerX, 100, "Game Over", {font: "32px Arial", fill: "#ffffff"});
    	text.anchor.set(0.5);

    	retry = this.game.add.text(this.game.world.centerX, 500, 'Press "N" to retry', {font: "32px Arial", fill: "#ffffff"});
        retry.anchor.set(0.5);

        this.nkey = this.game.input.keyboard.addKey(Phaser.Keyboard.N);
        this.nkey.onDown.add(this.next, this);
    },

    next : function() {

    	this.game.state.start("Game");  	
    }

};