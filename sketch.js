var girl,girlImg
var diamond,diamondImg,diamondGroup
var coin,coinImg,coinGroup
var zombie,zombieImg
var ob,obImg,obGroup,ob2,ob2Img,ob2Group,ob3,ob3Img,ob3Group
var bg,bg1,ivG
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;
var jumpSound , checkPointSound, dieSound;
var gameoverimg,gameover,collided

function preload() {
  girlImg=loadAnimation("Images/w1.png","Images/w2.png","Images/w3.png","Images/w4.png","Images/w5.png","Images/w6.png","Images/w6.png")
  bg=loadImage("Images/jungle.jpg")
  coinImg=loadImage("Images/Coin.png")
  diamondImg=loadImage("Images/Diamond.png")
  obImg=loadImage("Images/ob1.png")
  ob2Img=loadImage("Images/ob2.png")
  ob3Img=loadImage("Images/ob3.png")
  zombie=loadImage("Images/zombie.png")
  gameoverimg=loadImage("Images/Game Over.png")
  collided=loadImage("Images/w5.png")
}

function setup() {
  createCanvas(windowWidth-50,windowHeight);
  //bg1=createSprite(displayWidth/2-100,displayHeight/2-50)
  bg1=createSprite(width-400,height/2-50,width,height-20)
  bg1.scale=2.5;
  bg1.addImage(bg)
  bg1.velocityX= -2
  zom=createSprite(width/2-480,height-130)
  zom.addImage(zombie)
  zom.scale=0.4
   
girl=createSprite(width/2-400,height-100)
girl.addAnimation("girl1",girlImg)
girl.addAnimation("girlCollide",collided)
 coinGroup=new Group()
 diamondGroup=new Group()
 obGroup=new Group()
 ob2Group=new Group()
 ob3Group=new Group()
 ivG=createSprite(width/2-600,height-10,width,20)
 ivG.visible=false
 gameover=createSprite(width/2,height/2)
 gameover.addImage(gameoverimg)
}

function draw() {
  background(bg);
  if(gameState===PLAY){
    bg1.velocityX= -2
    gameover.visible=false
//console.log(girl.y)
  
  if(bg1.x<399){
    bg1.x=bg1.width/3
  }
  if(keyDown("space")&& girl.y>=450){
    girl.velocityY= -18
  }
  girl.velocityY=girl.velocityY+0.5
  tr1()
  tr2()
  obs()
  //obs2()
  obs3()

  for(var i=0;i<coinGroup.length;i++){
  if(coinGroup.get(i).isTouching(girl)){
    score=score+1
    coinGroup.get(i).remove()
  } }
  for(var j=0;j<diamondGroup.length;j++)
  if(diamondGroup.get(j).isTouching(girl)){
    score=score+3
    diamondGroup.get(j).remove()
  }
  if(obGroup.isTouching(girl)||ob3Group.isTouching(girl)){
    gameState=END;
    girl.visible=false
    zom.visible=false
    ob2Group.destroyEach()
    obGroup.destroyEach()
  }

 
}
else if(gameState===END){
  gameover.visible=true;
bg1.velocityX=0;
diamondGroup.destroyEach();
coinGroup.destroyEach();
ob3Group.destroyEach()

if(mousePressedOver(gameover)){
  reset()
  console.log("error")
}
}
textSize(25)
fill("Yellow") 
  text("Score: "+score,width-200,100)
  girl.collide(ivG)
  drawSprites()
}
function tr1(){
if (frameCount%100===0){
  coin=createSprite(width-50,300)
  coin.addImage(coinImg)
  coin.velocityX=-4
  coin.scale=0.08
  coin.y=Math.round(random(280,380))
  coinGroup.add(coin)
  coin.lifetime=370
}
}
function tr2(){
  if (frameCount%180===0){
    diamond=createSprite(width-50,300)
    diamond.addImage(diamondImg)
    diamond.velocityX=-4
    diamond.scale=0.2
    diamond.y=Math.round(random(330,400))
    diamondGroup.add(diamond)
    diamond.lifetime=370
  }
}
function obs(){
  if (frameCount%180===0){
    ob=createSprite(width-50,570)
    var ran=Math.round(random(1,2))
    switch(ran){
      case 1:ob.addImage(obImg)
      break ;
      case 2:ob.addImage(ob2Img)
      break;
      default:
      break;
    }
    //ob.addImage(obImg)
    ob.velocityX=-4
    ob.scale=0.4
    //diamond.y=Math.round(random(330,400))
    obGroup.add(ob)
    ob.lifetime=370
    girl.depth=ob.depth+1
    zom.depth=ob.depth+1
  }
}
/*function obs2(){
  if (frameCount%300===0){
    ob2=createSprite(width-50,570)
    ob2.addImage(ob2Img)
    ob2.velocityX=-4
    ob2.scale=0.5
    //diamond.y=Math.round(random(330,400))
    ob2Group.add(ob2)
    ob2.lifetime=370
    girl.depth=ob2.depth+1
    zom.depth=ob2.depth+1
  }
}*/
function obs3(){
  if (frameCount%280===0){
    ob3=createSprite(width-50,570)
    ob3.addImage(ob3Img)
    ob3.velocityX=-4
    ob3.scale=0.2
    ob3.y=Math.round(random(300,410))
    ob3Group.add(ob3)
    ob3.lifetime=370
    girl.depth=ob3.depth+1
    zom.depth=ob3.depth+1
  }
}
function reset(){
  gameState=PLAY;
  
  girl.visible=true
   girl.y=600;

   girl.scale=1
   console.log(girl.y)
   zom.visible=true
   score=0
   

}