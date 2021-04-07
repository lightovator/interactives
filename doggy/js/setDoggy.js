export class SetDoggyController{

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

    resize(){

    }

    draw(ctx,t){

    }
}