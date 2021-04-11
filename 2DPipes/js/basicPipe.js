const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let numberOfParticles = 200;

const particleArray = [];

let hue = 0

class Particle {
    constructor(){

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;

        this.radius = (Math.random()* 10)+ 2;
        this.speedX = (Math.random() *3) - 1.5;
        this.speedY = (Math.random() * 3) -1.5;
        this.color = Math.random()*360;



    }

    draw(){

        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius,0 ,Math.PI *2);
        ctx.fillStyle = 'hsl(' + this.color + ' , 100% , 50% )';
        ctx.fill();
    }
    update(){


        this.color++;
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x + this.radius > canvas.width ||
            this.x  - this.radus <0){
                this.speedX = -this.speedX;

            }
            if(this.y + this.radius > canvas.height ||
                this.y - this.radius < 0){
                    this.speedY = -this.speedY;
                }
        /*
        for(let i =0; i < particleArray.length ; i++){

           
                
                let dx = particleArray[i].x - this.x;
                let dy = particleArray[i].y - this.y;

                let distance = Math.sqrt(dx*dx + dy*dy);


                if(distance < particleArray[i].radius + this.radius){

                    particleArray[i].x = -particleArray[i].x;
                    particleArray[i].y = -particleArray[i].y;
                    this.x = -this.x;
                    this.y = -this.y;
                    
                }

                
            
        }
        */
            
    }


}

const init = () =>{
    for(let i = 0 ; i < numberOfParticles ; i++){
        particleArray.push(new Particle());
    }
}


const animate = () =>{
    //ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = 'rgba(255,255,255,0.005)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i = 0 ; i< particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();

    }
   
    requestAnimationFrame(animate);
}


init();
animate();