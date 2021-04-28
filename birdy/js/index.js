
const mouse = {
    x: 0,
    y: 0,
    mx: 0,
    my: 0,
    speed: 0.009
}



window.onload = ()=>{

    imageArr = document.getElementsByTagName('img');

    loop();



    window.addEventListener("mousemove" , mouseMovement);

   

    

    loop();


}

const loop = () =>{

    let dx = mouse.x - mouse.mx;
    let dy = mouse.y - mouse.my;
    mouse.mx += dx * mouse.speed;
    mouse.my += dy * mouse.speed;


    imageArr[0].style.transform = 'translate(' + -mouse.mx/6 +'px,' + -mouse.my/6 +'px)';
    imageArr[1].style.transform = 'translate(' + -mouse.mx/5 +'px,' + -mouse.my/5 +'px)';
    imageArr[2].style.transform = 'translate(' + -mouse.mx/3 +'px,' + -mouse.my/3 +'px)';
    imageArr[3].style.transform = 'translate(' + -mouse.mx/2 +'px,' + -mouse.my/2 +'px)';

    requestAnimationFrame(loop);
}
const mouseMovement = (e) =>{

    mouse.x = e.clientX - window.innerWidth/2;
    mouse.y = e.clientY - window.innerHeight/2;

} 