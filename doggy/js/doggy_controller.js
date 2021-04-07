import { Doggy } from "./doggy.js";

export class DoggyController{
    constructor(){

        this.img = new Image();
        
        this.img.onload = () =>{
            this.loaded();

        };

        this.img.src = "../image/trans_doggy.png";
        

        this.items = [];
        this.cur = 0;
        this.curY = 0;
        this.isLoaded = false;


    }

    resize(stageWidth , stageHeight){

        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;


    }

    loaded() {
        this.isLoaded = true;
        this.addDoggy();

    }

    addDoggy(){
        this.items.push(
            new Doggy(this.img,this.stageWidth)
        );
    }

    draw(ctx , t, dots){

        if(this.isLoaded){
            this.cur += 1;
            if(this.cur > 200){
                this.cur = 0;
                this.addDoggy();
            }

            for(let i = this.items.length -1 ; i >=0 ;i--){
                const item = this.items[i];

                if(item.x < -item.Width){
                    this.items.splice(i,1);
                }else{
                    item.draw(ctx , t ,dots);

                }
                
            }
        }

    }
}