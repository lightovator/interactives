export class Hill {

    constructor(color , speed ,total){

        this.color = color;
        this.speed = speed;
        this.total = total;
    } // to make various hills of various color, ...

    resize(stageWidth, stageHeight){

        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;


        this.points = [];
        this.gap = Math.ceil(this.stageWidth/(this.total-2));
        //total X-cordinate 보다 간격 넓게 잡아서 자연스런 양 출몰

        for(let i = 0 ; i < this.total ; i++){
            this.points[i] = {
                x: i*this.gap,
                y:this.getY()
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();  //***


        let cur = this.points[0];
        let prev = cur ;
        
        let dots = []; // 양의 좌표를 찾기 위해 배열에 저장하자
        

        cur.x += this.speed;
        if( cur.x > -this.gap){

            //새로운 요소를 배열의 맨 앞쪽에 추가하고, 새로운 길이를 반환합니다.
            this.points.unshift({
                x:-(this.gap*2),
                y:this.getY()
            });
        } else if( cur.x > this.stageWidth){
            this.points.splice(-1);
        }

        //화면에서 사라지면 배열에서 제거
        ctx.moveTo(cur.x,cur.y);


        let prevCx = cur.x;
        let prevCy = cur.y;


        for (let i = 1; i < this.points.length ; i++){

            if(i == this.points.length){
                i = 0;
            }
            cur = this.points[i];
            cur.x = cur.x + this.speed;
            //가속도는?
            //speed
            const cx = (prev.x + cur.x)/2;
            const cy = (prev.y + cur.y)/2;

            ctx.quadraticCurveTo(prev.x,prev.y,cx,cy);
            //making curve

            dots.push({
                x1:prevCx,
                y1:prevCy,
                x2:prev.x,
                y2:prev.y,
                x3:cx,
                y3:cy
            });

            prev = cur;
            prevCx = cx;
            prevCy = cy;
        

        }


        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x , this.stageHeight);
        ctx.fill();


        return dots;

    } // draw hill on canvas

    getY(){
        const min = this.stageHeight / 8;
        const max = this.stageHeight - min;

        return min + Math.random() * max ;

    }
    //to get random value of Y cordination of hill
    //idea = stage 높이를 8로 나눠서 최소 최대 범위에서 랜덤하게
}