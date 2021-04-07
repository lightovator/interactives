const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleArray = [];
//will hold all of particle object


// get mouse position

const mouse = {
    x: null,
    y: null
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
    constructor(){

    }

    draw(){

    }


}