import {Hill} from "./hill.js";
import {DoggyController} from "./doggy_controller.js";
import {Sun} from "./sun.js";



class App{
    constructor(){
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
      

        this.sun = new Sun();

        document.body.appendChild(this.canvas);

        this.hills = [
            new Hill('#410161', 0.2 , 12),
            new Hill('#8B0C4B', 0.5 , 8),
            new Hill('#ff4674', 1.4 , 6)
        ];
        //속도는 뒤에 있는 언덕일수록 느리게 , 앞에있는 언덕일수록 빠르게 , 언덕 개수도 다르게해서 촘촘하게
        //그럼 3d효과 내기 가능

        this.doggyController  =new DoggyController();
        window.addEventListener("resize",this.resize.bind(this),false);

        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }
  

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        
        this.canvas.width = this.stageWidth*2;
        this.canvas.height = this.stageHeight*2;

        this.ctx.scale(2,2);

        this.sun.resize(this.stageWidth,this.stageHeight);
        
        for(let i = 0 ; i< this.hills.length ; i++){

            this.hills[i].resize(this.stageWidth,this.stageHeight);
        }

        this.doggyController.resize(this.stageWidth , this.stageHeight);



    }//canvas size *2 letina display에서도 선명하게

    animate(t){ // time stamp //fps 정의 가능
        requestAnimationFrame(this.animate.bind(this));



        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
        // canvas 흰색으로 초기화
        this.sun.draw(this.ctx,t);

        let dots;

        for ( let i =0 ;i < this.hills.length ; i++){
            dots = this.hills[i].draw(this.ctx);
        }


        this.doggyController.draw(this.ctx,t,dots);

    } 
}


window.onload = () =>{
    new App();
}