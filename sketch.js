var sword,sword_cutting;

var fruit1,fruit2,fruit3,fruit4;

var alien;

var play=1;
var end=0;
var gamestate=play;

var score;

var gameover;

function preload()
{
  sword_cutting=loadImage("sword.png");
  
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  
  alien_moving=loadAnimation("alien1.png","alien2.png");
  
  gameover=loadImage("gameover.png");
}

function setup()
{
  createCanvas(600,700);
  
  sword=createSprite(40,200,20,20);
  sword.addImage("cutting",sword_cutting);
  sword.addImage("over",gameover);
  sword.scale=0.7;
  
  fruitesGroup = createGroup();
  enemiesGroup = createGroup();
  
  score=0;
  sword.setCollider("circle",0,0,50);
}

function draw()
{
  background("lightblue");
  
  if(gamestate===play)
    {
      fruits();
      
      alien();
      
      sword.x=mouseX;
      sword.y=mouseY;
      
      if(sword.isTouching(fruitesGroup))
        {
          fruitesGroup.destroyEach();
          score=score+1;
        }
      
      if(sword.isTouching(enemiesGroup))
      {
        gamestate=end;
      }
    }
  else if(gamestate===end)
    {
      fruitesGroup.setVelocityYEach(0);
      enemiesGroup.setVelocityYEach(0);
      fruitesGroup.setVelocityXEach(0);
      enemiesGroup.setVelocityXEach(0);
      fruitesGroup.setLifetimeEach(-1);
      enemiesGroup.setLifetimeEach(-1);
      
      sword.x=200;
      sword.y=200;
      sword.changeImage("over",gameover);
    }

  drawSprites();
  text("Score :"+score,325,25);
}

function fruits()
{
  if(frameCount%40===0)
    {
      var fruit=createSprite(Math.round(random(50,350)),0,10,10);
      fruit.velocityY=(5+score/100)
      
      fruit.scale=0.15;
      fruit.lifetime=100;
      
      var rand=Math.round(random(1,4));
      
      switch(rand)
        {
      case 1:fruit.addImage(fruit1);
      break;
      case 2:fruit.addImage(fruit2);
      break;
      case 3:fruit.addImage(fruit3);
      break;
      case 4:fruit.addImage(fruit4);
      break;
        }
      fruitesGroup.add(fruit);
    }
}

function alien()
{
  if(frameCount%300===0)
    {
      var alien=createSprite(Math.round(random(50,350)),0,10,10);
      alien.velocityY=(5+score/100);
      alien.scale=0.7;
      alien.lifetime=130;
      alien.addAnimation("moving",alien_moving);
    }
}


