const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lineColor = 'white';


const colorMap = {
    onRange: 'rgba(41,187,137,1)',
    outRange: "rgba(255,255,255,1)"
}

let particleArray = [];

// handle mouse

let mouse = {
    x: undefined,
    y: undefined,
    radius: 350,

}


window.addEventListener('mousemove',(event) =>{
    mouse.x = event.x;
    mouse.y = event.y;
    

})

window.addEventListener("mouseleave", (event) =>{
    mouse.x = null;
    mouse.y = null;
    event.x = null;
    event.y = null;
})


ctx.font = '30px Verdana';
ctx.fillStyle = 'white';
ctx.fillText('MONG', 0 , 30);
//ctx.strokeStyle = 'white';

//ctx.strokeRect(0,0,100,100);


const textCoordinates = ctx.getImageData(0,0, 100, 100);


class Particle{

    constructor(x, y){
        this.x = x + 100;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20 ) + 1;
        this.color = colorMap.outRange;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();

        ctx.arc(this.x,this.y, this.size, 0 , Math.PI *2);

        ctx.closePath();
        ctx.fill();
    }

    update(){
        // calculate two point distance

        let dx =mouse.x - this.x;
        let dy = mouse.y - this.y;
        //hypotheuse
        let distance = Math.sqrt((dx*dx) + (dy*dy));

        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;

        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        


       
        if(distance < mouse.radius){
            this.x -= directionX *3;
            this.y -= directionY *3;
            this.color = 'rgba(0,255,255,1)';
            
       
           
        }else{

            this.color = colorMap.outRange;
            if(this.x !== this.baseX ){
                let dx = this.x - this.baseX;

                this.x -= dx / 10;
            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY;

                this.y -= dy / 10;
            }
            this.size = 3;
        }
    }
}


const init = () =>{

    particleArray = [];


   
    for(let y =0 , y2 = textCoordinates.height ; y < y2 ;y++ ){
        for(let x = 0 , x2 = textCoordinates.width ; x < x2 ; x++){

            //built in
            // 128 == opacity = 50%
            if(textCoordinates.data[(y* 4 * textCoordinates.width) + (x*4)+3] > 128){
                let positionX = x;
                let positionY = y;
                particleArray.push(new Particle(positionX * 10, positionY * 10));
            }

        }
    }
   
}

const animate = () =>{
    ctx.clearRect(0,0,canvas.width , canvas.height);


    for(let i = 0 ; i < particleArray.length ; i++){
        particleArray[i].draw();
        particleArray[i].update();

    }

    connect();

    

    requestAnimationFrame(animate);


}

const connect = () => {
    for( let  i = 0 ; i < particleArray.length ; i++ ){



        let lx = mouse.x - particleArray[i].x;
        let ly = mouse.y - particleArray[i].y;

        let mdistance = Math.sqrt((lx*lx)+(ly*ly));


        for( let l = 0 ; l < particleArray.length ; l++){


            /*
        let dx =mouse.x - this.x;
        let dy = mouse.y - this.y;
        //hypotheuse
        let distance = Math.sqrt((dx*dx) + (dy*dy));
        */

      
        let dx = particleArray[i].x - particleArray[l].x;
        let dy = particleArray[i].y - particleArray[l].y;

        let distance = Math.sqrt((dx*dx) + (dy*dy));

        if(distance <20){
            opacityValue = 1 - ( distance/40);


            //lineColor =  mdistance < mouse.radius && mdistance > mouse.radius-50 ? 'rgba(0,255,255,'+opacityValue+ ')':'rgba(255,255,255,'+opacityValue+ ')';

            lineColor = mdistance > mouse.radius ? 'rgba(255,255,255,'+opacityValue+ ')' : 'rgba(0,255,255,'+opacityValue+ ')';
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(particleArray[i].x,particleArray[i].y);
            ctx.lineTo(particleArray[l].x,particleArray[l].y);
            ctx.stroke();
        

        }
    }


    
/*
     if(mdistance >420 && mdistance < 450){

        for( let l = 0 ; l < particleArray.length ; l++){



      
        let dx = particleArray[i].x - particleArray[l].x;
        let dy = particleArray[i].y - particleArray[l].y;

        let distance = Math.sqrt((dx*dx) + (dy*dy));
            opacityValue = 1 - ( distance/50);
            lineColor = 'rgba(0,255,255,'+opacityValue+ ')';
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(particleArray[i].x,particleArray[i].y);
            ctx.lineTo(particleArray[l].x,particleArray[l].y);
            ctx.stroke();
        
    }
    */
    
    }
}

init();


animate();

