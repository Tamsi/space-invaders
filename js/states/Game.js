var GameStage = {

    create : function(){

        this.direction = true;

        this.player = this.game.add.sprite(this.game.world.centerX, 600, 'player');
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.anchor.setTo(0.5);

        this.firstInvaders = this.game.add.group();
        this.firstInvaders.enableBody = true;
        this.firstInvaders.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 10; i++) {

            this.firstInvaders.create(30+i*60, this.game.world.centerY, 'firstInvader');
            //this.firstInvaders.body.collideWorldBounds = true;
            //this.firstInvaders.anchor.setTo(0.5);
            
        }

        this.firstInvaders.setAll('anchor.x', 0.5);
        this.firstInvaders.setAll('anchor.y', 0.5);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update : function() {

        console.log(this.direction);

        if (this.cursors.left.isDown){

            this.player.body.velocity.x = -150;

        } else if (this.cursors.right.isDown){

            this.player.body.velocity.x = 150;

        } else {

            this.player.body.velocity.x = 0;
        }

        if(this.firstInvaders.getAt(0).body.x >= 0 && this.firstInvaders.getAt(9).body.x <= 750 && this.direction){

            this.firstInvaders.forEach(function (enemy) {

                enemy.body.velocity.x = 50;           

            });
        } else if(this.firstInvaders.getAt(0).body.x >= 5 && this.firstInvaders.getAt(9).body.x <= 755 && !this.direction) {

            this.firstInvaders.forEach(function (enemy) {

                enemy.body.velocity.x = -50;
               
            });
        } else {

            this.direction = !this.direction
            this.firstInvaders.forEach(function (enemy) {

                enemy.body.y = enemy.body.y+30;           

            });

        }

        /*if(this.firstInvaders.getAt(9).body.x >= 750){

            this.firstInvaders.forEach(function (enemy) {

                enemy.body.velocity.x = -50;
                //enemy.body.y = enemy.body.y+30;

            });
        }*/
    }
}
