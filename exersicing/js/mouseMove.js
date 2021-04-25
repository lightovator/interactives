window.onload = () =>{

    let h1 = document.getElementsByTagName("h1")[0];

    let cursor_div = document.getElementsByClassName('cursor_item')[0];


    const mouse = {
        x: 0,
        y: 100,
        mx: 0,
        my: 0,
        speed: 0.03
    };

    const lineSizeV = cursor_div.offsetWidth;
    const lineSizeH = cursor_div.offsetHeight;

   

    window.addEventListener("mousemove",(e)=>{

        mouse.x = e.clientX;
        mouse.y = e.clientY;

        
  
    
    })

    
    const loop =() =>{

        
      

        mouse.mx += (mouse.x-lineSizeH/2-mouse.mx)*mouse.speed;
        mouse.my += (mouse.y-lineSizeV/2-mouse.my)*mouse.speed;

        // 조금씩 작은 수를 더해주어 볼록 곡선 속도 그래프 형태

        h1.innerHTML = `x:${mouse.mx} y:${mouse.my}`;
        cursor_div.style.transform = 'translate(' + mouse.mx + 'px,' + mouse.my + 'px)';



        window.requestAnimationFrame(loop);
        

    }

    loop();




}
