const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
//will hold all of particle object
const numberOfParticle = 3;
// get mouse position

const mouse = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove' , event => {
    mouse.x = event.x;
    mouse.y = event.y;
})

// when mouse leave canvas, keep last position => No!
// mouse leave 가 낫다

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
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y , this.size, 0 , Math.PI*2, false);
        // drawing circle

        ctx.fillStyle = this.color;
        ctx.fill();


    }

    update(){
        this.size -= 0.05;

        if( this.size < 0){
            this.x = (mouse.x + ((Math.random() *20) -10));

            this.y = (mouse.y + ((Math.random() *20) -10));

            this.size = (Math.random() *10 )+2;

            this.weight = (Math.random() * 2) - 0.5;
        }

        this.y += this.weight;
        this.weight += 0.2;

        if((this.y > canvas.height - this.size) && (this.weight > 0.5)){
           // this.weight *= -1;  // 무게 만큼 곱해서 위로 튕기게끔 ,    this.weight += 0.2; 에 의해 계속 떨어지고 0에 수렴할때까지

           this.weight *= -0.5;
        };


    }


}

const init =() =>{
    particleArray = [];

    for(let i = 0 ; i < numberOfParticle ; i++){
        let x = Math.random() * canvas.width ;
        let y = Math.random() * canvas.height;

        let size = (Math.random()*5) +2;
        let color = 'pink';

        let weight =1 ;
        particleArray.push(new particle(x,y,size,color,weight));
    }


}
const animate =()=>{

   //이게 그거임 분홍색 위에 살짝 불투명한 검은 용지 올리는 느낌
    
    //instead of clearing canvas of each frame make symite transparent rectangle
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //make continuos rectangle and opacity becomes 0

    for(let i = 0; i < particleArray.length ; i++){
        particleArray[i].update();
        particleArray[i].draw();

    
    }


    requestAnimationFrame(animate);

}

init();
animate();


///왜 마우스 움직임이 업데이트 되면 자동으로 실행되지?
//==> 200밀리초 지나면 그냥 위치 좌표가 초기화되는거