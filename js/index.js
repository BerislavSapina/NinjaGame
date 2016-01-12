window.onload = function(){
	
var game = new Phaser.Game(1000,550, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

var player;
var enemyBlue;
var enemyRed;
var shuriken;
var platforms;
var stars;
var cursors;
var grounds = [];
var tiles = [];
var waters = [];
var score = 0;
var space;
var xKey;
var direction = 1; // 1 is right, -1 is left
var superStar;

function preload(){
	game.load.image("background","assets/BG.png");
	game.load.atlasJSONHash("ninja","js/ninja.png","js/ninja.json");
	game.load.atlasJSONHash('shuriken','js/shuriken.png','js/shuriken.json')
	game.load.image("ground","assets/ground.png");
	game.load.image("platform","assets/platform.png");
	game.load.image("water","assets/water.png");
	game.load.image("tree","assets/tree.png");
	game.load.image("bush","assets/bush.png");
	game.load.image("sign","assets/sign.png");
	game.load.image("stone","assets/stone.png");
	game.load.image("enemyBlue","assets/enemyBlue.png");
	game.load.image("enemyRed","assets/enemyRed.png");
	game.load.image("mushroom","assets/mushroom.png");
	game.load.image("star","assets/star.png");
}
function create(){
		
	game.world.setBounds(0,0,2000,750);		
    game.add.sprite(0,0,"background");
	game.add.sprite(1000,0,"background");
	  
    platforms = game.add.group();
    platforms.enableBody = true;
    
    grounds[0] = platforms.create(0,game.world.height-99,"ground");
    grounds[0].body.immovable = true;
    
    tiles[0] = platforms.create(565,game.world.height - 350,"platform");
    tiles[0].body.immovable = true;  
    
    waters[0] = platforms.create(640,game.world.height-99,"water");
    waters[0].body.immovable = false;
    
    grounds[1] = platforms.create(896,game.world.height-99,"ground");
    grounds[1].body.immovable = true;
    
    waters[1] = platforms.create(1536,game.world.height-99,"water");
    waters[1].body.immovable = false;
    
    grounds[2] = platforms.create(1792,game.world.height-99,"ground");
    grounds[2].body.immovable = true;
    
    grounds[3] = platforms.create(2432,game.world.height-99,"ground");
    grounds[3].body.immovable = true;
    
    tiles[1] = platforms.create(1150,game.world.height - 550,"platform");
    tiles[1].body.immovable = true; 
	
	tiles[2] = platforms.create(990,game.world.height - 430, "platform");
    tiles[2].scale.setTo(0.3,0.3);
    tiles[2].body.immovable = true;
    
    tiles[3] = platforms.create(400,game.world.height - 250, "platform");
    tiles[3].scale.setTo(0.3,0.3);
    tiles[3].body.immovable = true;
    
    //ground
    game.add.sprite(100,game.world.height - 161,"sign");
    game.add.sprite(1140,game.world.height -372,"tree");
    game.add.sprite(1160,game.world.height - 140, "mushroom");
    game.add.sprite(1190,game.world.height - 140, "mushroom");
	
    //first platform
    game.add.sprite(500,game.world.height - 625,"tree");
    game.add.sprite(570,game.world.height -396,"bush");
    game.add.sprite(640,game.world.height -404,"stone");
    
    //second platform
    game.add.sprite(1230,game.world.height - 596,"bush");
    game.add.sprite(1290,game.world.height -604,"stone");
	
	//little platform
    game.add.sprite(400,game.world.height -296,"bush");
    game.add.sprite(450,game.world.height -291, "mushroom");
    
    player = game.add.sprite(0,game.world.height-270,'ninja','idle/0001.png');
	player.scale.setTo(0.2,0.2);
	player.anchor.setTo(0.5,0.5);
    
    enemyBlue = game.add.sprite(600,360,"enemyBlue");
    enemyBlue.scale.setTo(0.15,0.15);
    enemyBlue.anchor.setTo(0.5,0.5);
   
    enemyRed = game.add.sprite(1220,game.world.height - 600 ,"enemyRed");
    enemyRed.scale.setTo(0.15,0.15);
    enemyRed.anchor.setTo(0.5,0.5);
    
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(enemyBlue);
    game.physics.arcade.enable(enemyRed);
	  
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true
	
	//Player animations
    player.animations.add('run', Phaser.Animation.generateFrameNames('run/', 1, 3, '.png', 4), 10, true, false);
	player.animations.add('idle', Phaser.Animation.generateFrameNames('idle/', 1, 8, '.png', 4), 10, true, false);
	player.animations.add('slash',Phaser.Animation.generateFrameNames('slash/', 1, 3, '.png', 4), 30, true, false); 
	player.animations.add('throw',Phaser.Animation.generateFrameNames('throw/', 1, 3, '.png', 4), 10, false, false); 
	
	//Enemies
    enemyBlue.body.gravity.y = 400;
    enemyBlue.body.collideWorldBounds = true;
    enemyRed.body.gravity.y = 400;
    enemyRed.body.collideWorldBounds = true;

	//Stars****
    stars = game.add.group();
    stars.enableBody = true;
    
    for(var i = 5; i < 10; i++){
      var star = stars.create(i*60,game.world.height-150,"star");
      star.body.gravity.y = 9;
      star.body.bounce.y = 0.7 + Math.random() * 0.4;
    }
    
    for(var i = 5; i < 10; i++){
      star = stars.create(350 + i *60,game.world.height-400,"star");
      star.body.gravity.y = 9;
      star.body.bounce.y = 0.7 + Math.random() * 0.4;
    }
	
	superStar = game.add.sprite(1100,game.world.height-150,"star");
	superStar.scale.setTo(1.5,1.5);
	game.physics.arcade.enable(superStar);
	
	for(var i = 0; i < 4; i++){
		star = stars.create(1200 + i*60,game.world.height-650,"star");
		star.body.gravity.y = 9;
		star.body.bounce.y = 0.7 + Math.random() * 0.4;
	}
	for(var i = 0; i < 3; i++){
		star = stars.create(1820 + i*60,game.world.height-150,"star");
		star.body.gravity.y = 9;
		star.body.bounce.y = 0.7 + Math.random() * 0.4;
	}
	
	cursors = game.input.keyboard.createCursorKeys();
	space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); // 32 is DEC of SPACE in ascii table
	xKey = game.input.keyboard.addKey(Phaser.Keyboard.X); // 120 is DEC of x in ascii table
	
    game.camera.follow(player);
}
function update() {

      game.physics.arcade.collide(player,platforms);
      game.physics.arcade.collide(enemyBlue,platforms);
      game.physics.arcade.collide(enemyRed,platforms);
      game.physics.arcade.collide(stars,platforms);
	  
      game.physics.arcade.overlap(player,stars,collectStar,null,this);
	  game.physics.arcade.overlap(player,enemyBlue,killPlayer,null,this);
	  game.physics.arcade.overlap(player,enemyRed,killPlayer,null,this);
	  game.physics.arcade.overlap(player,waters,killPlayer,null,this);
	  game.physics.arcade.overlap(player,superStar,playerWon,null,this);
	  game.physics.arcade.overlap(enemyBlue,shuriken,killEnemy,null,this);
      game.physics.arcade.overlap(enemyRed,shuriken,killEnemy,null,this);
	  
      
      player.body.velocity.x = 0;
      
	if (cursors.right.isDown){
        //  Move to the left
        player.body.velocity.x = 250;	
		player.scale.setTo(0.2,0.2);
        player.animations.play('run');
		direction = 1;
    }
	else if (cursors.left.isDown){
        //  Move to the left
        player.body.velocity.x = -250;		
		player.scale.setTo(-0.2,0.2);	
        player.animations.play('run');
		direction = -1;
    }
	else if(space.isDown){
		player.animations.play('slash');
	}
	else if(xKey.isDown){
		player.animations.play('throw');
		
		if(direction === 1)
		{
			shuriken = game.add.sprite(player.x + 37,player.y + 6,'shuriken','shuriken/0003.png');
			game.physics.arcade.enable(shuriken);
			shuriken.body.velocity.x = 350;
		}
		else
		{
			shuriken = game.add.sprite(player.x - 37,player.y + 6,'shuriken','shuriken/0003.png');
			game.physics.arcade.enable(shuriken);
			shuriken.body.velocity.x = -350;
		}
			shuriken.scale.setTo(0.1,0.1);
			shuriken.anchor.setTo(0.5,0.5);
			
			//Shuriken animations
			shuriken.animations.add('spin',Phaser.Animation.generateFrameNames('shuriken/', 1, 3, '.png', 4), 10, true, false);
			shuriken.animations.add('explode',Phaser.Animation.generateFrameNames('explode/', 1, 3, '.png', 4), 10, true, false);

			shuriken.animations.play('spin');
	}
    else
    {
        //  Stand still
        player.animations.play('idle');
    }
      
	if(cursors.up.isDown && player.body.touching.down)
	{
		player.body.velocity.y = -450;
	}
      
	//enemyBlue moving
	if(enemyBlue.body.position.x <= 568)
	{
	enemyBlue.body.velocity.x = 100;
	}     
	else if(enemyBlue.body.position.x >= 880)
	{
	enemyBlue.body.velocity.x = -100;
	}

	//enemyRed moving
	if(enemyRed.body.position.x <= 1180)
	{
	enemyRed.body.velocity.x = 100;
	}     
	else if(enemyRed.body.position.x >= 1480)
	{
	enemyRed.body.velocity.x = -100;
	}  	
}
function render(){
    game.debug.cameraInfo(game.camera,32,32);
    game.debug.spriteCoords(player,32,500);
}
function collectStar(player,star){
  star.kill();
}
function killPlayer(player,enemyBlue){
  player.kill();
  alert("Game Over! Refresh page!");
}
function playerWon(player,superStar){
	alert("You won! Refresh page to play again!");
}
function killEnemy(enemy,shuriken){
	enemy.kill();
	shuriken.animations.stop('spin',null,true);
	shuriken.animations.play('explode');
	shuriken.body.velocity.x=0;
	setTimeout(function(){shuriken.kill();},100)
}
//END
}


