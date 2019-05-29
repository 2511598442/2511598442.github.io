//删除子弹方法
Array.prototype.delete = function(value) {
    for (var i = this.length - 1; i >= 0; i--) {
        var item = this[i].date;
        if (value === item) {
            this.splice(i, 1);
        }
    }
}
//删除怪物方法
Array.prototype.removemst = function(value) {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i].num==value.num) {
            this.splice(i, 1);
            //怪物死亡加分
            CONFIG.score+=1;
        }
    }
    //怪物是否全被消灭
    if(msts.length==0){
      if(CONFIG.level==3){
          GAME.allsuccess();
          return;
      }
      GAME.success();
      document.querySelector('.score').innerHTML=CONFIG.score;
    }
}