var plane={
        x: 320, // 矩形的 x 坐标
        y: 470, // 矩形的 y 坐标
        step: 5, // 矩形移动的步伐
        image:new Image(),
        planeinit:function(){
          this.image.src=CONFIG.planeIcon;
        },
        print:function(){
          
          context.drawImage(this.image,plane.x,470,CONFIG.planeSize.width,CONFIG.planeSize.height);
        },
        state:0,
        move:function(){
          if (this.x<=610&&this.x>=30) {
            if (this.state==1){this.x+=this.step}
            if (this.state==-1){this.x-=this.step}
          }
          if (this.x>=610) {
            this.x=610;
          }
          
          if (this.x<=30) {
            this.x=30;
          }
        },
        shoot:function(){
         
          blt=new Bullet(this.x);
          blts.push(blt);
          blt.show();
          blt.fly();
        },
        die:function(){
          context.clearRect(this.x,this.y,CONFIG.planeSize.width,CONFIG.planeSize.height);
        }

}