let scroll ;
let maxHeight;
let windowOut;
let windowIn ;
let per = undefined;
let operationProperty;

const progress = document.getElementsByClassName('progressBar')[0];


const progressMaker = (e) =>{

    console.log('hit');
    let scroll = document.documentElement.scrollTop;

    per =  Math.ceil( (scroll / operationProperty) *100 );

    progress.style.width = `${per}%`;

  
    console.log(scroll , operationProperty);
  //  console.log(progress.style.width);



} 

const handleResize = e =>{

    
    let scroll = document.documentElement.scrollTop;
    let maxHeight = document.documentElement.scrollHeight;
    let windowOut = window.outerHeight ; 
    let windowIn = window.innerHeight;

 //   console.log( 1, scroll);
    operationProperty =  maxHeight - windowOut + (windowOut - windowIn);




    progressMaker();
}

const init = () =>{
    window.addEventListener('resize' , handleResize);
    window.addEventListener('scroll', progressMaker);

    handleResize();




}

init();
