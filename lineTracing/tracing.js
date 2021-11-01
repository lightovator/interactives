


let scroll = document.documentElement.scrollTop;
const scrollHeight = document.documentElement.scrollHeight

const path = document.querySelector('path')

//const pathTotal = path.getTotalLength();
const pathTotal = 3241; // 수치는 목표 지점의 scroll Height
const initPos = path.getPointAtLength(0);


const ball = document.querySelector('.line-tracer');


const position = {
    x: 0 ,
    y: 0,
    sx : 0,
    sy: 0,
}


// ball.style.transform = "translate("+ `${initPos.x-8}` + "px," + `${initPos.y-8}`+ "px)"



position.sx= path.getPointAtLength(0).x
position.sy= path.getPointAtLength(0).y


console.dir(ball)

const updateScroll = e =>{

    // const scroll =(((document.documentElement.scrollTop) / pathTotal) *  pathTotal);
    const scroll = document.documentElement.scrollTop

    const percent = (scroll / pathTotal) * 100;



    console.log(scroll,pathTotal , percent);
    ball.style.offsetDistance =  percent+ '%';


    // const tracer = document.getElementsByClassName('line-tracer')[0].innerHTML;
    // styles.insertRule(`.line-tracer{offset-distance: ${scroll+300}px}`,3);
 

    
   
}
window.addEventListener('scroll' , updateScroll);


// function refreshData() {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === xhr.DONE) {
           
//             console.log("refresh!");
           
//         }
//     }
//     xhr.open("POST", './index.html', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(null);
// }
// setInterval(refreshData, 100);
