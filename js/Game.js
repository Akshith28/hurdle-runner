class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      car1 = createSprite(10,300);
      car1.addImage("car1",car1_img);
      car1.scale = 0.35;
      car2 = createSprite(10,500);
      car2.addImage("car2",car2_img);
      car2.scale = 0.35;
      car3 = createSprite(10,700);
      car3.addImage("car3",car3_img);
      car3.scale = 0.35;
      car4 = createSprite(10,900);
      car4.addImage("car4",car4_img);
      car4.scale = 0.35;
      cars = [car1, car2, car3, car4];
    }
  
    play(){
      form.hide();
      spawnObstacles();
      spawnObstacles1();
      spawnObstacles2();
      spawnObstacles3();
      
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(track,0,360,displayWidth*4, displayHeight+60);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var y = 430 ;
        var x = 0;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          y = y + 180;
          //use data form the database to display the cars in y direction
          x = displayHeight - allPlayers[plr].distance;
          cars[index-1].x = x;
          cars[index-1].y = y;
  
          if (index === player.index){
            cars[index - 1].shapeColor = "red";
            camera.position.y = displayWidth/2;
            camera.position.x = cars[index-1].x;
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance -=10
        player.update();
      }
      if(keyIsDown( UP_ARROW) && player.index !== null){
        player.velocityY =10;
      
      }
      if(player.distance === 6400){
        gameState = 2;
      }

      if(car1.collide(obstacle)) {
        gameState===2;
        car1.setVelocityX = 0;
    }
    if(car2.collide(obstacle)) {
      gameState===2;
      car2.setVelocityX = 0;
    }
    if(car3.collide(obstacle)) {
      gameState===2;
      car3.setvelocityX=0;
    }
    if(car4.collide(obstacle)) {
      gameState===2;
      car4.setVelocityX = 0;
    }

      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
    }
  }

  function spawnObstacles() {
    var i = 0;
    if (frameCount % 360 === 0) {
        i = i + 1000
        obstacle = createSprite(600, 125);
        obstacle.visible=true;
        obstacle.velocityX = -2;
        obstacle.addImage(hurdle);

        obstacle.scale = 0.80;
        obstacle.lifetime = 800;
        obstacle.setCollider("rectangle", -10, 0, 90, 150);
        obstacle.debug = true;
    }
}

function spawnObstacles1() {
    if (frameCount % 360 === 0) {

        obstacle = createSprite(900, 385);

        obstacle.velocityX = -2;
        obstacle.addImage(hurdle);
        obstacle.scale = 0.80;
        obstacle.lifetime = 800;
        obstacle.setCollider("rectangle", -10, 0, 90, 150);
        obstacle.debug = true;

    }
}

    function spawnObstacles2() {
        if (frameCount % 360 === 0) {
    
            obstacle = createSprite(1100, 645);
    
            obstacle.velocityX = -2;
            obstacle.addImage(hurdle);
            obstacle.scale = 0.80;
            obstacle.lifetime = 800;
            obstacle.setCollider("rectangle", -10, 0, 90, 150);
            obstacle.debug = true;
    
        }
    }

    function spawnObstacles3() {
        if (frameCount % 360 === 0) {
    
            obstacle = createSprite(750, 205);
    
            obstacle.velocityX = -2;
            obstacle.addImage(hurdle);
            obstacle.scale = 0.80;
            obstacle.lifetime = 800;
            obstacle.setCollider("rectangle", -10, 0, 90, 150);
            obstacle.debug = true;
    
        }
    }

  