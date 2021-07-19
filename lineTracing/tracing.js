


let scroll = document.documentElement.scrollTop;
const scrollHeight = document.documentElement.scrollHeight

const path = document.querySelector('path')

const pathTotal = path.getTotalLength();

const initPos = path.getPointAtLength(0);


const ball = document.querySelector('.line-tracer');


ball.style.transform = "translate("+ `${initPos.x-8}` + "px," + `${initPos.y-8}`+ "px)"





const updateScroll = e =>{

    const scroll =((document.documentElement.scrollTop) / pathTotal) *  pathTotal;

     
     const points  = path.getPointAtLength(scroll)





     ball.style.transform = "translate("+ `${points.x-8}` + "px," + `${points.y-8}`+ "px)"


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
