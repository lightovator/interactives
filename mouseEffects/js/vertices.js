const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');


//need toaware of every particles loaction
//if close enough to connect them in a line
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
//will hold all of particle object
const numberOfParticle = 200; 
// get mouse position

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove' , event => {
    mouse.x = event.x;
    mouse.y = event.y;
})

setInterval(()=>{
    mouse.x = undefined;
    mouse.y = undefined
}, 200);




//create particles
//5:30
class particle {
    constructor(x ,y ,size ,color, weight){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }

    update(){
        this.size -= 0.1;

        if( this.size < 0){
            this.x = (mouse.x + ((Math.random() *20) -10));

            this.y = (mouse.y + ((Math.random() *20) -10));

            this.size = (Math.random() *12 )+10;

            this.weight = (Math.random() * 2) - 0.5;
        }

        this.y += this.weight;
        this.weight += 0.2;

        if((this.y > canvas.height - this.size) ){

            this.weight *= -0.2;
           
        };


    }


}

const init =() =>{
    particleArray = [];

    for(let i = 0 ; i < numberOfParticle ; i++){
        let x = Math.random() * canvas.width ;
        let y = Math.random() * canvas.height;

        let size = (Math.random()*15) +10;
        let color = 'pink';

        let weight =1 ;
        particleArray.push(new particle(x,y,size,color,weight));
    }


}

const connect =() =>{

    let opacityValue =1;
    // animate opacity of line as the distance of individual particle line changes

    //if particles are to far from each other, opcity 0

    //check distance of each particle

    for(let a = 0; a < particleArray.length ; a++){
        for(let b = a ; b < particleArray.length ; b++){

            // 피타고라스 정리
            let distance = ((particleArray[a].x - particleArray[b].x)*(particleArray[a].x - particleArray[b].x))
            +
            ((particleArray[a].y - particleArray[b].y)*(particleArray[a].y - particleArray[b].y))

            if(distance < 200){
                opacityValue = 1 - (distance/10000);
                ctx.strokeStyle ='rgba(255,255,255,'+`${opacityValue}` +')';

                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.moveTo(particleArray[a].x , particleArray[a].y);
                //starting point


                ctx.lineTo(particleArray[b].x , particleArray[b].y);


                ctx.stroke();
                //connecting
            }
        }
    }
}
const animate =()=>{

  
  
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < particleArray.length ; i++){
        particleArray[i].update();
        connect();
    }

    

    requestAnimationFrame(animate);

}

init();
animate();

