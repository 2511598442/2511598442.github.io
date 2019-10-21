class Bullet{
    constructor(x){
        this.width=1;
        this.size=CONFIG.bulletSize;
        this.speed=CONFIG.bulletSpeed;
        var x1=x+CONFIG.planeSize.width/2;
        this.x=x1;
        this.y=plane.y;
        this.date=new Date().getTime();
    }

    show(){
        context.strokeStyle='white';
        context.lineWidth=1;
        context.beginPath();
        context.moveTo(this.x,this.y);
        context.lineTo(this.x,this.y-this.size);
        context.stroke();
    }
    fly(){
      context.clearRect
        this.y-=this.speed;
    }
    touch(){
      if (this.y<30) {
        blts.delete(this.date);
      }
    }
}