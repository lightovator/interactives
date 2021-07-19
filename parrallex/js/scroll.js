let scroll = 0;
const text = document.getElementsByTagName('h1')[0];

const pgBar = document.getElementsByClassName('progressBar')[0];
const pgStatus = document.getElementsByClassName('status')[0];

const pgMax = pgBar.clientHeight;


let windowH;
let documentH;
let per;



const scrollEvent = e =>{

    pgBar.style.opacity = 1;
    scroll = document.documentElement.scrollTop;



    per =   Math.ceil((scroll / (documentH-windowH)) * 100);

   // let statusWidth = pgMax *(per/100);


    pgStatus.style.height = per + '%';

    console.log(pgStatus.style.height);
  

    text.innerHTML = `${per} `+ scroll +' '+ documentH +' '+ (documentH-windowH);





    setTimeout(()=>{

        pgBar.style.opacity = 0 ;
    }, 1000)
    
}


const resize = (e) =>{
    var body = document.body,

    html = document.documentElement;
    
var height = Math.max( body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight );

    
    

    scroll = document.documentElement.scrollTop;

    topBrowser = window.outerHeight - window.innerHeight;

    
    windowH = window.outerHeight - topBrowser;//*********** */
    documentH = height;  //************** */

    scrollEvent(1);

console.log( scroll ,window.innerHeight , window.outerHeight);

}



window.addEventListener('scroll',scrollEvent);
window.addEventListener('resize',resize);

resize(1);
