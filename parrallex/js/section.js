    const section = document.getElementsByTagName('section')[0];

    let _scroll = document.documentElement.scrollTop;

    const _scrollMax = document.getElementsByTagName('body')[0].style.scrollHeight - window.outerHeight;

    const imgContainer = document.getElementsByClassName('img_container')[0];
    const img = document.getElementsByClassName('img')[0];
    const title = document.getElementsByClassName('title')[0];

    const dcContainer = document.getElementsByClassName('dc_container')[0];
    let ratio;
    const scaleRate = 0.1;
    const opacityRate = 0.1;
    




    const getRatio = (e) =>{

        _ratio = (_scroll/_scrollMax) *100;
        _scroll = document.documentElement.scrollTop;
    }


    const parrelizing = (e) =>{

    
        title.style.transform = `translate(0,`+-_scroll/5+`px)`;

        img.style.backgroundPosition = 'center center ' + -_scroll/3+ 'px';
        img.style.transform = 'scale(' + (1+_scroll/2000) +  ')';
        img.style.filter = 'blur(' + _scroll/200 + 'px)';
   

        
    }



    window.onload = () =>{
        window.addEventListener('scroll' , getRatio);
        window.addEventListener('scroll' , parrelizing);
    

    }


