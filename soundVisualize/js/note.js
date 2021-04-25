const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext('2d');

let margin_right ;
let margin_left ;
let speed = 0.005;
let hold_duration = 300;

const main = () =>{
   
    fitToScreen();
    addEventListeners();
    drawScene();
    animate();
   
   
}

let audio_context;

let notes = ['E6','D6','C6','B5','A5','G5','F5','E5','D5','C5','B4','A4','G4','F4','E4','D4','C4','B3','A3','G3','F3'];


let freq = [1318.51, 1174.66, 1046.5, 987.767, 880, 783.991, 698.456, 659.255, 587.33, 523.251, 493.883, 436.04, 392.44, 349.228, 329.628, 293.665, 261.626, 246.942, 220, 195.998, 174.614];
let mouse = {
    x:0,
    y:0,
    isDown: false
}
const addEventListeners = () =>{
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mousedown',onMouseDown);
    canvas.addEventListener('mouseup',onMouseUp);
    window.addEventListener('resize',fitToScreen);

}

const onMouseMove = (event) =>{
    mouse.x = event.x;
    mouse.y = event.y;
}

const onMouseDown = (event) =>{
    mouse.isDown = true;
    moving_notes.push(new Note({
        x:margin_right,
        y:mouse.y
    },0.5 ));
}
const onMouseUp = (event) =>{
    mouse.isDown = false;
}


let moving_notes = [];

const drawNote = (ctx,location,duration)=>{



    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
 

    if(duration < 4){
        ctx.beginPath();
        ctx.moveTo(location.x + spacing, location.y);
        ctx.lineTo(location.x + spacing , location.y - spacing*5);
        ctx.stroke();
    

    }

    if(duration == 0.5){
        ctx.beginPath();
        ctx.moveTo(location.x+spacing , location.y-spacing*5);
        ctx.bezierCurveTo(
            location.x+spacing*2 , location.y - spacing*3,
            location.x+spacing*2.5,location.y-spacing*3,
            location.x+spacing*2.5,location.y-spacing*1
        )
    
        ctx.bezierCurveTo(
            location.x+spacing*2.5 , location.y - spacing*2.7,
            location.x+spacing*2,location.y-spacing*2.7,
            location.x+spacing,location.y-spacing*4.5
        )
    if(duration <= 1){
        ctx.stroke();
        ctx.fill();

    }
       

    }
  

    ctx.beginPath(); // to make oval
    ctx.save(); // save the context state
    ctx.translate(location.x,location.y);
    ctx.rotate(-0.2);
    ctx.scale(1.05,0.8);
    ctx.arc(0,0,spacing,0,Math.PI *2);


   // ctx.arc(location.x, location.y, radius, 0 , Math.PI *2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    //restore cotext last saved state
    //else will be offset in weird way


}

class Note{
    constructor(location, duration){
        let index = Math.round(location.y/spacing);
        this.frequency = freq[index];
        this.location ={
            x: location.x,
            y: index*spacing 
        }
        this.duration = duration;

        this.bord = new Date().getTime();

    }
    update(){
        let timeDiff = new Date().getTime(); - this.born;
        let noteType = Math.floor(timeDiff/hold_duration);
        switch(noteType){
            case 0 : this.duration = 0.5;break;
            case 1 : this.duration = 1;break;
            case 2 : this.duration = 2;break;
            case 3 : this.duration = 4;break;
            
        }
    }

    draw(ctx){
        drawNote(ctx,this.location,this.duration);

    }
    play(){
        if(audio_context == null){
            audio_context = new (AudioContext || webkitAudioContext || window.AudioContext);
        }
        else{

            
            let osc = audio_context.createOscillator();

            //basically sin
            osc.type = ' triangle';
        
            let gainNode = audio_context.createGain();
            gainNode.gain.setValueAtTime(0,audio_context.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.4,audio_context.currentTime + 0.05);
            gainNode.gain.linearRampToValueAtTime(0,audio_context.currentTime + this.duration);


        
            osc.frequency.value = this.frequency;
            osc.start(audio_context.currentTime);
          
            osc.stop(audio_context.currentTime+this.duration);
            osc.connect(gainNode);
            
            gainNode.connect(audio_context.destination);

        }

    }
}


const drawScene = ()=>{


    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
   
    let spacing = canvas.height/20;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    for(let i = -2 ; i <= 2 ; i++){

        let y = canvas.height/2 + i*spacing*2;
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y);
        ctx.stroke();
    }


    let index = Math.round(mouse.y / spacing);


    let location = {
        x: margin_right,
        y: mouse.y
    }

    drawNote(ctx,location,0.5);

    
    for(let i = 0 ; i<moving_notes.length ; i++){
        moving_notes[i].draw(ctx);
    }

}

const fitToScreen = () =>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    
    spacing = canvas.height/20;
    margin_right = canvas.width*0.8;
    margin_left = canvas.width*0.1;
    drawScene();


}



const updateMovingNotes = () =>{
    
    for(let i = 0 ; i < moving_notes.length; i++){
        console.log(moving_notes)
        moving_notes[i].location.x -= speed*canvas.width;
        console.log(moving_notes[0].location.x);
        if(moving_notes[i].location.x <= margin_left){
            moving_notes[i].play();
            moving_notes.splice(i,1);
         
            i--;

        }
      
    }
    if(mouse.isDown == true && moving_notes.length > 0){
        moving_notes[moving_notes.length-1].update();

    }

}

const animate = () =>{
    

    updateMovingNotes();
    drawScene();
    requestAnimationFrame(animate);


}

main();


