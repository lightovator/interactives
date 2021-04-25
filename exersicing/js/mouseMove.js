window.onload = () =>{

    let h1 = document.getElementsByTagName("h1")[0];

    let cursor_div = document.getElementsByClassName('cursor_item')[0];



    console.dir(cursor_div);
    window.addEventListener("mousemove",(e)=>{

        h1.innerHTML = `x:${e.clientX} y:${e.clientY}`;

        cursor_div.style.transform = 'translate('+ e.clientX + 'px,' +  e.clientY + 'px)';
    })

}

//화면이 다 로드 된 후에 실행하라