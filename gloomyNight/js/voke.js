const canvas = document.querySelector('canvas');

ctx = canvas.getContext('2d');


const stageWidth = window.innerWidth ;
const stageHeight = window.innerHeight;

const colorMap = [];


let particleArray = [];

const vokeNum = 8;


class Voke{
    constructor(){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.x =  Math.random()*this.stageWidth;
        this.y = Math.random() * this.stageHeight;
        this.size = (Math.random() *200) + 50;
        this.opacity = Math.random();
        this.color = colorMap[Math.random()*colorMap.length];
        this.direction = true;
        this.maxSize = this.size + 100;

        window.addEventListener('resize' , resize);



    }

    resize(){

        this.stageHeight = window.innerHeight;
        this.stageWidth = window.innerWidth;

    }


    draw(){

        ctx.clearRect(0,0,this.stageWidth,this.stageHeight);

        ctx.beginPath();


        ctx.arc(this.x,this.y,this.size , 0 , Math.PI*2);

        ctx.fillStyle = this.color;

        ctx.fill();




    }

    update(){

        if(this.direction == true){
            this.opacity += 0.0001;
        }else{
            this.opacity -=0.0001;
        }

        if(this.opacity >= 1){
            this.direction = false;
        }

        this.draw();

    }
}

const init =()=>{

    for(let i = 0 ; i < vokeNum ; i++){
        particleArray.push(new Voke);
    }

}

window.onload = () =>{

    init();

    animate();

}



const animate = () =>{


    for(let i = 0 ; i < particleArray.length ; i++){







        if(particleArray[i].opacity <= 0 ){
            particleArray.splice(i,1);
            particleArray.push(new Voke());
        }
    }


    requestAnimationFrame(animate);

}