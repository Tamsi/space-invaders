BasicGame.Game = function (game) {

    this.game;      
    this.add;       
    this.camera;    
    this.cache;     
    this.input;     
    this.load;      
    this.math;      
    this.sound;     
    this.stage;    
    this.time;      
    this.tweens;    
    this.state;     
    this.world;     
    this.particles; 
    this.physics;   
    this.rnd;       
};

BasicGame.Game.prototype = {

    create : function(){

        this.direction = true;

        this.rays = this.game.add.group();
        this.rays.physicsBodyType = Phaser.Physics.ARCADE;
        this.rays.enableBody = true;

        this.rays.setAll('outOfBoundsKill', true);
        this.rays.setAll('checkWorldBounds', true);

        this.rays.setAll('anchor.x', 0.5);
        //this.rays.setAll('anchor.y', 0.5);

        this.rays.createMultiple(2000, 'bullet');

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
        }

        this.firstInvaders.setAll('anchor.x', 0.5);
        this.firstInvaders.setAll('anchor.y', 0.5);

        this.zkey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.zkey.onDown.add(this.shot, this);
        
        //this.game.state.start('End');

        console.log(this.firstInvaders);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update : function() {

        var that = this;

        // console.log(this.firstInvaders.getFirstAlive().body.y);

        if (this.cursors.left.isDown){

            this.player.body.velocity.x = -150;

        } else if (this.cursors.right.isDown){

            this.player.body.velocity.x = 150;

        } else {

            this.player.body.velocity.x = 0;
        }

        if(this.firstInvaders.getFirstAlive().body.x >= 0 && this.firstInvaders.getAt(this.firstInvaders.countLiving()-1).body.x <= 750 && this.direction){

            this.firstInvaders.forEach(function (enemy) {

                enemy.body.velocity.x = 100;           

            });
        } else if(this.firstInvaders.getFirstAlive().body.x >= 5 && this.firstInvaders.getAt(this.firstInvaders.countLiving()-1).body.x <= 755 && !this.direction) {

            this.firstInvaders.forEach(function (enemy) {

                enemy.body.velocity.x = -100;
               
            });
        } else {

            this.direction = !this.direction
            this.firstInvaders.forEach(function (enemy) {
                enemy.body.y = enemy.body.y+60;

                if(enemy.body.y > 560){
                    //console.log("ici");
                    that.game.state.start('End');
                }
            });

        }
        this.game.physics.arcade.overlap(this.rays, this.firstInvaders, this.collision, null, this);
    },

    finish : function(enemy){

        this.player.destroy();
        this.firstInvaders.destroy();
        this.rays.destroy();

        this.game.state.start('End');
    },

    shot : function () {

           var ray = this.rays.getFirstExists(false);
           //console.log(ray.body);
            if (ray)
            {
                ray.reset(this.player.x, this.player.y + 8);
                ray.body.velocity.y = -400;
            }
    },

    collision : function (ray, firstInvader) {

        ray.kill();
        firstInvader.kill();

        // var explosion = this.add.sprite(firstInvader.x, firstInvader.y, 'explosion');
        // explosion.anchor.setTo(0.5, 0.5);
        // explosion.animations.add('boom');
        // explosion.play('boom', 15, false, true);
    },

};
