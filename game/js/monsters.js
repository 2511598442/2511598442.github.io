class Monster{
// enemySpeed: 2, 
//   enemySize: 50, 
//   enemyGap: 10,  
//   enemyIcon: './img/enemy.png', 
//   enemyBoomIcon: './img/boom.png', 
//   enemyDirection: 'right', 
  constructor(x,y,num){
      this.x=x+30;
      this.y=y+30;
      this.enemySpeed=CONFIG.enemySpeed;// 默认敌人移动距离
      this.enemySize=CONFIG.enemySize;// 默认敌人的尺寸
      this.enemyGap=CONFIG.enemyGap;// 默认敌人之间的间距
      this.enemyIcon=CONFIG.enemyIcon;// 怪兽的图像
      this.enemyBoomIcon=CONFIG.enemyBoomIcon;// 怪兽死亡的图像
      this.enemyDirection=CONFIG.enemyDirection;// 默认敌人一开始往右移动
      this.state='live';
      this.num=num;
  }
  show(){
    var mstimage=new Image();
    if (this.state=='die') {
      mstimage.src=this.enemyBoomIcon;
    }else{
      mstimage.src=this.enemyIcon;
    }
    context.drawImage(mstimage,this.x,this.y,50,50);
  }
  move(){
    
    if (this.x>620) {
      for (var i = msts.length - 1; i >= 0; i--) {
        msts[i].enemyDirection='left';
        msts[i].y+=50;
      }
    }

    if(this.x<30){
      for (var i = msts.length - 1; i >= 0; i--) {
        msts[i].enemyDirection='right';
        msts[i].y+=50;
      }
    }




    if(this.enemyDirection=='right'){
      this.x+=this.enemySpeed;
    }
    if(this.enemyDirection=='left'){
      this.x-=this.enemySpeed;
    }


    //判定接触子弹
    for (var i =blts.length - 1; i >= 0; i--) {
      for (var j = msts.length - 1; j >= 0; j--) {
        if(blts[i]){
        if (!(msts[j].x + msts[j].enemySize < blts[i].x) &&
            !(blts[i].x + blts[i].width < msts[j].x) &&
            !(msts[j].y + msts[j].enemySize < blts[i].y) &&
            !(blts[i].y + blts[i].bulletSize < msts[j].y)) {
            msts[j].die();
            blts.delete(blts[i].date);
            
        }
      }
      }
    }
    //判定是否过底线
    if (this.y>470) {
        GAME.failed();
        document.querySelector('.score').innerHTML=CONFIG.score;
    }
  }
  die(){
    this.state='die';
    var self=this;
    setTimeout(function(){
      msts.removemst(self);
    },1000/20);
  }

}
