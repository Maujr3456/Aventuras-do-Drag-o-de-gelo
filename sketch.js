var dragon, dragon_animation;
var warrior, warrior_attack_animation;
var background1, background_sprite;
var iceImg;
var mana = 300;
var manaSprite;
var manaImage;
var groupPotion;
var groupWarrior;
var vida = 300;
var heart;
var groupIce;
function preload(){
  dragon_animation = loadAnimation('images/dragon1.png','images/dragon2.png','images/dragon3.png','images/dragon2.png');
  warrior_attack_animation = loadAnimation('images/Knight_01__ATTACK_000.png','images/Knight_01__ATTACK_003.png','images/Knight_01__ATTACK_005.png','images/Knight_01__ATTACK_009.png','images/Knight_01__ATTACK_000.png','images/Knight_01__ATTACK_000.png','images/Knight_01__ATTACK_000.png','images/Knight_01__ATTACK_000.png',);
  background1 = loadImage('images/background.png');
  warrior_walk_animation = loadAnimation()
  iceImg = loadImage('images/fire.png');
  manaImage = loadImage('images/mana.png')



}
function setup(){
  createCanvas(windowWidth, 1000);
  background_sprite = createSprite(width/2, height/2,width,height);
  background_sprite.addImage(background1)

  dragon = createSprite(600, 465);
  dragon_animation.frameDelay = 5;
  dragon.addAnimation('fly', dragon_animation);
  dragon.scale = 0.4
  dragon.debug = false;
  dragon.setCollider('rectangle', 150,0, 700,500);

  manaSprite = createImg('images/mana.png');
  manaSprite.size(120,120);
  manaSprite.position(0,0);

  groupPotion = new Group();
  groupWarrior = new Group();
  groupIce = new Group();

  heart = createImg('images/heart pixel art 254x254.png');
  heart.position(17,120)
  heart.size(80,80)
  
}

function draw(){
  background(100);
  background_sprite.velocityX = -5
  if(background_sprite.x <0){
    background_sprite.x = background_sprite.width / 2;
  }
  dragon.overlap(groupPotion, function(colector, colectable){
    if(mana < 300){
      mana += 30
    }
    colectable.remove()
  })

  

  


  if(dragon.isTouching(groupWarrior)){
    vida -=20
    console.log(vida)
    dragon.y -=200;
    dragon.x -=100
  }
  
  controls();
  drawSprites();
  rect(80,50, 300, 30);
  push();
  fill('blue');
  rect(80,50, mana, 30);
  pop();
  if(mana === 30){
    push();
    fill('red');
    rect(80,50, 30, 30);
    pop();
  }
  rect(80,140, 300, 30);
  if(vida >=5){
  push();
  fill('red');
  rect(80,140, vida, 30);
  pop();
  }
  
  gerarMana();
  gerarInimigos();
}

function controls(){
  if(keyDown(UP_ARROW)&& dragon.y >= 5){
    dragon.y -= 10
    console.log(dragon.x);
  }
  if(keyDown(DOWN_ARROW) && dragon.y <= 735){
    dragon.y += 10
  
  }
  if(keyDown(RIGHT_ARROW) && dragon.x <= width -100){
    dragon.x += 15
  }
  if(keyDown(LEFT_ARROW) && dragon.x >= 100){
    dragon.x -= 15
  }

  if(keyDown('space') && mana > 30){
    var ice = createSprite(dragon.x, dragon.y);
    ice.addImage(iceImg);
    groupIce.add(ice);
    ice.velocityX = 15;
    mana -= 30;

    


  }
  groupIce.overlap(groupWarrior, function(ice, warrior){
    ice.remove();
    warrior.remove();
  })
}

function gerarMana(){
  if(frameCount %120 === 0){
    var potion = createSprite(width, random(5, 735));
    potion.addImage(manaImage);
    potion.scale = 0.5;
    potion.velocityX = -10;
    groupPotion.add(potion);
    

  }


}
function gerarInimigos(){
  if(frameCount %60 === 0){
    warrior = createSprite(width, 863);
    warrior_attack_animation.frameDelay = 3
    warrior.addAnimation('attack',warrior_attack_animation);
    warrior.scale = 0.5
    warrior.debug = false;
    warrior.setCollider('rectangle', -200,0,700,500);

    var velocity = [-13, -16, -20];
    warrior.velocityX = random(velocity);
    groupWarrior.add(warrior);
  }
}