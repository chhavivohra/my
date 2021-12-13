class Game {
  constructor() {}
   
  getState(){
    var gameStateRef=database.ref("gameState")
    gameStateRef.on("value",function(data){
      gameState=data.val()
    })
  }


  update(state){
  database.ref("/").update({
    gameState:state
  })
  }


  start() {
    player = new Player();
    playerCount=player.getCount()
    form = new Form();
    form.display();
    gun1=createSprite(width/2-50,height-100)
    gun1.addImage("gun1",gun1_img)
    gun2=createSprite(width/2+100,height-100)
    gun2.addImage("gun2",gun2_img) 
    guns=[gun1,gun2]

  }


  handleElements(){
    form.hide()
    form.titleImg.position(40,50)
    form.titleImg.class("gameTitleAfterEffect")
    this.leaderBoardTitle.html("leaderBoard")
    this.leaderBoardTitle.position(width/3-60,40)
    this.leader1.position(width/3-50,80)
    this.leader2.position(width/3-50,130)
  }

  play(){
    this.handleElements()
    player.getPlayersInfo()
    if(allPlayers !== undefined){
     image(backgroundImage,0,-height*5,widht,height*6)
     this.showTheLeaderBoard()
     var index = 0
     for(var plr in allPlayers){
       index=index+1
       var x=allPlayers[plr].positionX
       var y=height-allPlayers[plr].positionY
       guns[index-1].position.x=x;
       guns[index-1].position.y=y;
     }
     this.handlePlayersControls()
     
     drawSprites()
    }
  }
  
   handlePlayersControls(){
   if(keyIsDown(LEFT_ARROW)){
   player.positionX -= 5
   player.update();
   }
   if(keyIsDown(RIGHT_ARROW)) {
     player.positionX += 5
     player.update();
     
   } 
   }
   showTheLeaderBoard(){
     var leader1,leader2
     if((players[0].rank === 0 && players[1].rank === 0 ) || players[0].rank === 1){
    leader1=
    player[0].rank +
    "&emsp" +
    player[0].name +
    "&emsp" +
    player[0].score

    leader2=
    player[1].rank +
    "&emsp" +
    player[1].name +
    "&emsp" +
    player[1].score
    
   }
   if(players[1].rank === 1 ){
    leader1=
    player[1].rank +
    "&emsp" +
    player[1].name +
    "&emsp" +
    player[1].score

    leader2=
    player[0].rank +
    "&emsp" +
    player[0].name +
    "&emsp" +
    player[0].score
    
   }
  
   this.leader1.html(leader1)
   this.leader2.html(leader2)

}
