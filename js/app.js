//配置
var CONFIG = {
  status: 'start', // 游戏开始默认为开始中
  level: 1, // 游戏默认等级
  totalLevel: 6, // 总共6关
  numPerLine: 6, // 游戏默认每行多少个怪兽
  canvasPadding: 30, // 默认画布的间隔
  bulletSize: 10, // 默认子弹长度
  bulletSpeed: 10, // 默认子弹的移动速度
  enemySpeed: 2, // 默认敌人移动距离
  enemySize: 50, // 默认敌人的尺寸
  enemyGap: 10,  // 默认敌人之间的间距
  enemyIcon: './img/enemy.png', // 怪兽的图像
  enemyBoomIcon: './img/boom.png', // 怪兽死亡的图像
  enemyDirection: 'right', // 默认敌人一开始往右移动
  planeSpeed: 5, // 默认飞机每一步移动的距离
  planeSize: {
    width: 60,
    height: 100
  }, // 默认飞机的尺寸,
  planeIcon: './img/plane.png',
  score:0
};

// 元素
var container = document.getElementById('game');
var canvas = document.getElementById('canvas');
var context= canvas.getContext('2d');

var cleartime=0;
//子弹数组
var blts=[];
//怪数组
var msts=[];
msts.shoulddown=false;




/**
 * 整个游戏对象
 */
var GAME = {
  /**
   * 初始化函数,这个函数只执行一次
   * @param  {object} opts 
   * @return {[type]}      [description]
   */
  init: function(opts) {
    this.status = 'start';
    this.bindEvent();
    
    $('canvas').hide();
  },
  bindEvent: function() {
    var self = this;
    var playBtn = document.querySelector('.js-play');
    var replayBtn = document.querySelector('.js-replay');
    var replayBtn2 = document.querySelector('.js-replay2');
    var nextBtn = document.querySelector('.js-next');
    // 开始游戏按钮绑定
    playBtn.onclick = function() {
      self.play();
    };
    replayBtn.onclick=function(){
      CONFIG.score=0;
      CONFIG.level=1;
      self.play();
    }
    replayBtn2.onclick=function(){
      CONFIG.score=0;
      CONFIG.level=1;
      self.play();
    }
    nextBtn.onclick = function(){
      self.play();
    }
    //绑定按键事件
    document.onkeydown=function(event){
       var e=window.event||arguments[0];
       if(e.keyCode==39){//方向键→
         plane.state=1;
       
       }

       if(e.keyCode==37){//方向键<
         plane.state=-1;
         
       }
       
       if(e.keyCode==32){//空格发射
         plane.shoot();
       }
    }
    document.onkeyup=function(){
      var e=window.event||arguments[0];
      if(e.keyCode==32){
        return false;
      }
      if (e.keyCode==39||e.keyCode==37) {
        plane.state=0;
      }
    }

  },

  /**
   * 更新游戏状态，分别有以下几种状态：
   * start  游戏前
   * playing 游戏中
   * failed 游戏失败
   * success 游戏成功
   * all-success 游戏通过
   * stop 游戏暂停（可选）
   */

  setStatus: function(status) {
    this.status = status;
    container.setAttribute("data-status", status);
  },
  play: function() { 
    window.cancelAnimationFrame(cleartime);
    $('canvas').show();
    this.setStatus('playing');
    plane.print();
    initmsts();
    animate();
  },
  failed:function(){
    this.setStatus('failed');
    msts=[];
    context.clearRect(0, 0, canvas.width, canvas.height);
    $('canvas').hide();
    window.cancelAnimationFrame(cleartime);
  },
  success:function(){
    this.setStatus('success');
    context.clearRect(0, 0, canvas.width, canvas.height);
    CONFIG.level+=1;
    $('canvas').hide();
    window.cancelAnimationFrame(cleartime);
  },
  allsuccess:function(){
    this.setStatus('all-success');
    context.clearRect(0, 0, canvas.width, canvas.height);
    $('canvas').hide();
    window.cancelAnimationFrame(cleartime);
  }
};

// 初始化

GAME.init();
plane.planeinit();


//设置定时器
    // window.requestAnimFrame =
    // window.requestAnimationFrame ||
    // window.webkitRequestAnimationFrame ||
    // window.mozRequestAnimationFrame ||
    // window.oRequestAnimationFrame ||
    // window.msRequestAnimationFrame ||
    // function(callback) {
    //    window.setTimeout(callback, 1000 / 60);
    // };

   function clear(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function animate() {
            // 清除画布
            clear()
            //更新子弹
            for (var i = blts.length - 1; i >= 0; i--) {
              blts[i].show();
              blts[i].fly();
              blts[i].touch();
            }
            //更新怪兽
            for (var i = 0; i < msts.length; i++) {
              msts[i].move();
              msts[i].show();
            }
            //更新飞机
            plane.move();
            plane.print();
            // 使用requestAnimationFrame实现动画循环

            
            cleartime=requestAnimationFrame(animate);
             //更新分数
             context.fillStyle='white';
             context.font='20px arial';
            context.fillText('分数:'+CONFIG.score,30,50);
    }

    function initmsts(){
      var num=7*CONFIG.level;
      for (var i = 0; i < num; i++) {
        var monster=null;
        monster=new Monster((i%7)*(50+CONFIG.enemyGap-i/8)+i/8,Math.floor(i/7)*50,i);
        msts.push(monster);  
      }
    
    }

