
 let h1 = document.getElementsByTagName("h1")[0];

 const human = document.getElementsByClassName('mid_human')[0];

 const backGround = document.getElementsByClassName('background_blur')[0];


 const beer = document.getElementsByClassName('beer')[0];

 const moon = document.getElementsByClassName('moon')[0];

window.onload = () =>{
   

    const mouse = { 
        x: 0,
        y: 0,
        mx: 0,
        my: 0,
        speed: 0.003
    };

    basicPositionSettingMid();
   
    imageRatio(backGround);
    basicPositionSettingBackGround();

    console.log(backGround.offsetHeight);
    window.addEventListener("mousemove", (e) =>{


        mouse.x = e.clientX - window.innerWidth/2;
        mouse.y = e.clientY - window.innerHeight/2;
        loop();
    
        //원점을 중앙에 놓는 거!!! 중요!!!
    })
    
  

    let blurValue =0;



    beerEffect();


    const loop =() =>{
        mouse.mx += (mouse.x-mouse.mx)*mouse.speed;
        mouse.my += (mouse.y-mouse.my)*mouse.speed;

        h1.innerHTML = `x:${mouse.x} mx:${mouse.mx}`;


        human.style.transform = 'translate(' +(-mouse.mx/6) + 'px,' + (-mouse.my/6) + 'px)';
        backGround.style.transform = 'translate(' +(mouse.mx/8) +'px)';

        moon.style.transform = 'translate(' +(-mouse.mx/15) + 'px,' + (-mouse.my/19) + 'px)';
        
        
        blurValueMoon = mouse.mx /15 ;
        moon.style.filter = `blur(${blurValueMoon}px)`;
        
        
 

        window.requestAnimationFrame(loop);
        

    }

   




}



const basicPositionSettingBackGround = () =>{

    backGround.style.left = `${window.innerWidth/2 - backGround.offsetWidth/2}px`;




}

const basicPositionSettingMid = () =>{


    human.style.top = `${window.innerHeight/2 - human.offsetHeight/2}px`;

    
}


const imageRatio = (content) =>{
    const width = content.offsetWidth;
    const height = content.offsetHeight;
    const windowSize = {
        width : window.innerWidth,
        height: window.innerHeight
    }
    const ratio = width/ height;

    console.dir(content);

    

    console.log(content.width);
    content.height = `${windowSize.width / ratio}`;
    content.width = `${windowSize.width+200}`;

    console.log(content.offsetHeight);

}