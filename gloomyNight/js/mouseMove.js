

const html = document.querySelector('html');
 const human = document.getElementsByClassName('mid_human')[0];

 const backGround = document.getElementsByClassName('background_blur')[0];


 const beer = document.getElementsByClassName('beer')[0];

 const moon = document.getElementsByClassName('moon')[0];


 const love = document.getElementsByClassName('love')[0];


 const arrow = document.getElementsByClassName("left_arrow")[0];

 const d_arrow = document.getElementsByClassName('yellowArrow')[0];

 const music = document.getElementsByClassName('music')[0];

 const aud = new Audio('./p1.mp3');

 let moonlight = 0;
let moonflag = false;
/*


let leftlight = 0;
let leftflag = false;


let rightlight = 0;
let rightflag = false;

console.log(1, music.style.filter);

if( !music.style.filter.includes('blur') ){
    console.log(music.style.filter +` blur($3px)` );
   
    music.style.filter =music.style.filter.concat(3,` blur($3px)`);
    console.log(2,music.style.filter);
}
else{
  
    console.log(3,music.style.filter);
    music.style.filter.slice(music.style.filter.indexOf(' '));
    console.log(4,music.style.filter);

    music.style.filter +=` blur($3px)`;
    console.log(5,music.style.filter);


}
*/

window.onload = () =>{
   

    



    const mouse = { 
        x: 0,
        y: 0,
        mx: 0,
        my: 0,
        speed: 0.003
    };

    ///
  

    ///

    basicPositionSettingMid();
   
    imageRatio(backGround);
    basicPositionSettingBackGround();




    window.addEventListener("mousemove", (e) =>{


        mouse.x = e.clientX - window.innerWidth/2;
        mouse.y = e.clientY - window.innerHeight/2;
        loop();
    
        //원점을 중앙에 놓는 거!!! 중요!!!
    })

    music.addEventListener('click' , musicSwitch);


  //  human.addEventListener('mousedown', humanDown);

    love.addEventListener('click', loveClick);
    
  

    

    
    const loop =() =>{

    
        mouse.mx += (mouse.x-mouse.mx)*mouse.speed;
        mouse.my += (mouse.y-mouse.my)*mouse.speed;





        human.style.transform = 'translate(' +(-mouse.mx/6) + 'px,' + (-mouse.my/6) + 'px)';
        human.style.filter = 'drop-shadow(18px 18px 30px white)'


        backGround.style.transform = 'translate(' +(mouse.mx/8) +'px)';

     

         beer.style.transform = 'translate(' +(mouse.mx/8) +'px)';

        moon.style.transform = 'translate(' +(-mouse.mx/15) + 'px,' + (-mouse.my/19) + 'px)';
        
        moonfilter(moon , mouse);
    

        love.style.transform = 'translate(' +(-mouse.mx/3) + 'px,' + (-mouse.my/10) + 'px)';
       
        
        arrow.style.transform = 'translate(' +(mouse.mx/8) +'px)';

        d_arrow.style.transform = 'translate(' +(mouse.mx/8) +'px)';
        music.style.transform = 'translate(' +(mouse.mx/8) +'px)';
 
       // constantLfilter(beer, music, mouse);

    

        window.requestAnimationFrame(loop);
        

    }

   




}
const constantLfilter = (ob1 ,ob2 , mouse) =>{

    let constants = -mouse.mx /16 ;
    if(leftflag == false){
        leftlight += 0.0001;
        if(leftlight >= 1.75){
            leftflag = true;
            
            
        }
    }else{
        leftlight -= 0.0001;
        if(leftlight <= 0.5){
            leftflag = false;
            }
    }

    if(constants <0){
        constants = 0;

    }
    if( !ob1.style.filter.includes('blur') || !ob2.style.filter.includes('blur') ){
        ob1.style.filter +=` blur(${constants}px)`;
        ob2.style.filter +=` blur(${constants}px)`;
    }
    else{
        ob1.style.filter.slice(ob1.style.filter.indexOf(' '));
        console.log(ob1.style.filter);

        ob1.style.filter +=` blur(${constants}px)`;
        console.log(ob1.style.filter);
        ob2.style.filter.slice(ob2.style.filter.indexOf(' '));

        ob2.style.filter +=` blur(${constants}px)`;


    }

}



const moonfilter = (moon , mouse) =>{

    let blurValueMoon = mouse.mx /15 ;
    if(moonflag == false){
        moonlight += 0.0001;
        if(moonlight >= 1.75){
            moonflag = true;
            
            
        }
    }else{
        moonlight -= 0.0001;
        if(moonlight <= 0.5){
            moonflag = false;
            }
    }

    if(blurValueMoon <0){
        blurValueMoon = 0;

    }
    moon.style.filter =`brightness(${moonlight}) blur(${blurValueMoon}px)`;

}
/*
const humanDown = (e)=>{
    const target = e.target;


    console.dir(target);
    target.style.opacity = 0.8;
    target.style.filter = 'drop-shadow(18px 18px 30px red)'

}
*/

const musicSwitch = (e) =>{

    const target = e.target;
  
    if(target.style.animation == ''){
        console.log(1);

        aud.play();
        target.style.animation = 'flitering 5s ease-in-out infinite';
       
    }else{
        aud.pause();
        target.style.animation = '';
    }
    
    
}

const basicPositionSettingBackGround = () =>{

    backGround.style.left = `${window.innerWidth/2 - backGround.offsetWidth/2}px`;




}

const loveClick =( e) =>{
    const target = e.target;
    if(target.style.animation ==''){
        target.style.transition = 'all 1s ease';
        target.style.top = '' + window.innerHeight/2 - target.height/2 +'px';
        target.style.left = '' + window.innerWidth/2-75 + 'px';
        target.style.animation = 'heartBit 1.5s ease-out infinite';
    }else{
        target.style.top = '30px';
        target.style.left = ''+ window.innerWidth/2 - 150 + 'px';
        target.style.animation ='';
        setTimeout(()=>{
            target.style.transition = '';

        }, 1000)

    }
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

  
    
    content.height = `${windowSize.width / ratio}`;
    content.width = `${windowSize.width+200}`;


}