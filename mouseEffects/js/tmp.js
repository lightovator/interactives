

function assignDate(day){

    let returnVal = '';


    if(day === '1'){
        returnVal = 'monday'
    }
    else if(day ==='2'){
        returnVal = 'tuesday'
    }else{
        returnVal = 'wednesday'
    }



    return returnVal;


}

const getLastday = (birth) => birth[birth.length -1];


function init(){


    const birth = '960921';
    //1 

    const lastday = getLastday(birth);

    const result = assignDate(lastday);
}

init();


const button = document.getElementsByClassName('hello');

button[2].style.backgroundColor = 'red';

button[2].addEventListener('mousemove' , ()=>{
    button[2].style.backgroundColor = 'red';
})