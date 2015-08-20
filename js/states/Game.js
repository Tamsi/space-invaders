BasicGame.Game = function (game) {    };

BasicGame.Game.prototype = {

    create : function(){

        this.level = 1;
        this.score = 0;
        this.scoreText = this.game.add.text(16, 16, 'player: 0', { fontSize: '32px', fill: '#ffffff' });
        this.direction = true;
        this.velocity = 150;

        this.rays = this.game.add.group();
        this.rays.physicsBodyType = Phaser.Physics.ARCADE;
        this.rays.enableBody = true;

        this.invaders = this.game.add.group();
        this.invaders.enableBody = true;
        this.invaders.physicsBodyType = Phaser.Physics.ARCADE;
        this.createInvaders();

        this.rays.createMultiple(2000, 'bullet');

        this.rays.setAll('outOfBoundsKill', true);
        this.rays.setAll('checkWorldBounds', true);

        this.rays.setAll('anchor.x', 0.5);
        this.rays.setAll('anchor.y', 0.5);


        this.player = this.game.add.sprite(this.game.world.centerX, 600, 'player');
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.anchor.setTo(0.5);

        this.zkey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.zkey.onDown.add(this.shot, this);
        
        //this.game.state.start('End');

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    createInvaders : function(){

        for (var i = 0; i < 10; i++) {

            this.invaders.create(30+i*60, this.game.world.centerY, 'firstInvader');
            this.invaders.create(30+i*60, this.game.world.centerY-50, 'firstInvader');
            this.invaders.create(30+i*60, this.game.world.centerY-100, 'secondInvader');
            this.invaders.create(30+i*60, this.game.world.centerY-150, 'secondInvader');
            //this.invaders.body.collideWorldBounds = true;     
        }
        this.invaders.setAll('anchor.x', 0.5);
        this.invaders.setAll('anchor.y', 0.5);

        this.velocity = this.velocity * (this.level/2 + 0.5);
    },

    update : function() {

        var that = this;
        var firstPosition = 1000;
        var lastPosition = 0;

        this.invaders.forEachAlive(function (invader) {
            if(invader.body.x > lastPosition){
                lastPosition = invader.body.x;
            }
            if(invader.body.x < firstPosition){
                firstPosition = invader.body.x;
            }
        });
        

        if (this.cursors.left.isDown){
            this.player.body.velocity.x = -150;
        } else if (this.cursors.right.isDown){
            this.player.body.velocity.x = 150;
        } else {
            this.player.body.velocity.x = 0;
        }

        if(firstPosition >= 0 && lastPosition <= 750 && this.direction){

            this.invaders.forEach(function (enemy) {

                enemy.body.velocity.x = that.velocity;           

            });
        } else if(firstPosition >= 5 && lastPosition <= 755 && !this.direction) {

            this.invaders.forEach(function (enemy) {

                enemy.body.velocity.x = -that.velocity;
               
            });
        } else {

            this.direction = !this.direction;
            var i=0;
            this.invaders.forEachAlive(function (enemy) {
                enemy.body.velocity.x = 0;
                enemy.body.y = enemy.body.y+30;

                if(enemy.body.y > 560){
                    //console.log("ici");
                    that.game.state.start('End');
                }
            });

        }
        if(this.invaders.countLiving() === 0){
            this.level += 1;
            this.createInvaders();
        }
        
        this.game.physics.arcade.overlap(this.rays, this.invaders, this.collision, null, this);
    },

    finish : function(enemy){

        this.player.destroy();
        this.invaders.destroy();
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
       
    collision : function (ray, invader) {

        ray.kill();
        invader.kill();

        //console.log(invader);
        
        if(invader.key === 'firstInvader'){
            this.score += 15;
        } else if(invader.key === 'secondInvader'){
            this.score += 20;
        }

        this.scoreText.text = 'player: ' + this.score;

        this.explosion = this.game.add.sprite(invader.x, invader.y, 'explosion');
        this.game.physics.arcade.enable(this.explosion);
        this.explosion.animations.add('explosion', [0, 1, 2, 3, 4], 15, false);
        this.explosion.play('explosion', 30, false, true);
    },

};
