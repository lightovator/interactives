export class Doggy{
    constructor(img, stageWidth){
        this.img = img;
        
        this.totalFrame = 16;
        this.curFrame = 0;
        this.imageSpriteCordinate_X = 0;
        this.imageSpriteCordinate_Y = 0;

        this.imgWidth =180;
        this.imgHeight = 180;

        this.doggyWidth = 110;
        this.doggyHeight = 110;

        this.doggyWidthHalf = this.doggyWidth / 2;

        this.x = stageWidth + this.doggyWidth / 2;
        this.y = 0;
        this.speed = Math.random() *2+1;

        this.fps = 24;
        this.fpsTime = 1000/this.fps;  //time stamp comare

    }


    draw(ctx ,t, dots){
/*
        this.animate(ctx,dots);
        this.curFrame += 1;
        if(this.curFrame == this.totalFrame){
            this.curFrame = 0;
        }
        
*/

        
        if(!this.time) {
            this.time = t;
        }

        const now = t-this.time;


       


        if(now > this.fpsTime){
            
            
            this.time = t;
            this.curFrame +=1;
            this.imageSpriteCordinate_X += 1;

            if(this.curFrame == this.totalFrame){
                this.curFrame = 0;
                this.imageSpriteCordinate_X = 0;
                this.imageSpriteCordinate_Y = 0;
              
            }

            if(this.curFrame == 8 || this.curFrame == 15){

                this.imageSpriteCordinate_X = 0;
                this.imageSpriteCordinate_Y += 1;
                
            }

            
       
        }
   
        this.animate(ctx,dots);
        
    }

    animate(ctx ,dots){
        
        this.x -= this.speed;
        const closest = this.getY(this.x,dots);



        this.y = closest.y;

        
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(closest.rotation);

        ctx.fillStyle = '#000000';

        ctx.drawImage(
            this.img,
            this.imageSpriteCordinate_X * this.imgWidth == 1260 ? 1080 : this.imageSpriteCordinate_X * this.imgWidth ,
            this.imageSpriteCordinate_Y * this.imgHeight,
            this.imgWidth,
            this.imgHeight,
            -this.doggyWidthHalf,
            -this.doggyHeight+20,
            this.doggyWidth,
            this.doggyHeight

        );
       // console.log(`X :: ${this.imageSpriteCordinate_X * this.imgWidth} , Y :: ${this.imageSpriteCordinate_Y * this.imgHeight} cur:: ${this.curFrame}`)
        
        ctx.restore(); //저장한 캔버스 복귀



    }


    getY(x,dots){
        for(let i = 1 ; i< dots.length ; i++){
            if(x >= dots[i].x1 && x <= dots[i].x3){
                return this.getY2(x,dots[i]);
            }
        }

        return {
            y: 0 ,
            rotation: 0
        };
    }

    getY2(x,dot) {
        const total = 200;
        let pt = this.getPointOnQuad(dot.x1 , dot.y1 , dot.x2, dot.y2 , dot.x3 , dot.y3 , 0);
        let prevX = pt.x;

        for(let i = 0 ; i < total ; i++){
            const t = i / total;
            pt = this.getPointOnQuad(dot.x1 , dot.y1 , dot.x2 , dot.y2 , dot.x3 , dot.y3 ,t);

            if( x>= prevX && x<= pt.x) {

                return pt;
            }

            prevX = pt.x;
        }
        return pt;

    }

    getQuadValue(p0,p1,p2,t) {
        return (1-t) * (1-t) * (p0) + 2*(1-t)*t*p1 +t*t*p2;
    }

    getPointOnQuad(x1,y1,x2,y2,x3,y3,t){

        const tx = this.quadTangent(x1,x2,x3,t);
        const ty = this.quadTangent(y1,y2,y3,t);
        const rotation = -Math.atan2(tx,ty) + (90*Math.PI/180);
        return {
            x: this.getQuadValue(x1,x2,x3,t),
            y: this.getQuadValue(y1,y2,y3,t),
            rotation
        }
    }

    quadTangent(a,b,c,t){

        return 2*(1 - t)*(b - a) + 2*(c - b)*(1 - t);
    }
    
}