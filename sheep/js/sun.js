export class Sun{
    constructor(){
        this.radius = 200;
        this.total = 60;
        this.gap = 1/this.total;
        this.originPos = [];
        this.pos = [];
        this.x = 0;
        this.y = 0;

        for(let i =0 ; i <this.total ; i++){
            const pos = this.getCirclePoints(this.radius,this.gap*i);
            this.originPos[i] = pos;
            this.pos[i] = pos;
          


        }

        this.fps = 30;
        this.fpsTime = 1000/this.fps;


        

    }

    resize(width, height) {

        this.stageWidth = width;
        this.stageHeight = height;

        this.x = this.stageWidth - this.radius - 50;
        this.y = this.stageHeight - this.radius - 400;
    }

    draw(ctx, t){

        if(!this.time){
            this.time = t;
        }

        const now = t - this.time;

        if(now > this.fpsTime){
            this.time = t;
            this.updatePoints();

        }
        ctx.fillStyle = "#ffb200";
        ctx.beginPath();

        let pos = this.pos[0];

        
        ctx.moveTo(pos.x + this.x , pos.y + this.y);
        for(let i = 1 ; i  < this.total ; i++){
            const pos = this.pos[i]
            ctx.lineTo(pos.x + this.x , pos.y + this.y);
        }
       // ctx.arc(this.x,this.y,this.radius,0,2 * Math.PI); // circle method
        ctx.fill();


    }

    updatePoints(){
        
        for(let i = 1 ; i < this.total ; i++ ){
            const pos = this.originPos[i]

            this.pos[i] = {
                x: pos.x + this.ranInt(5),
                y: pos.y + this.ranInt(5)
            }
        }
    }

    ranInt(max){
        return Math.random()*max;
    }

    getCirclePoints(radius,t){
        const theta = Math.PI*2*t;

        return {
            x: Math.cos(theta)*radius,
            y: Math.sin(theta)*radius
        }
    }
}