let screen=document.querySelector('.screen');
let buttons=document.querySelectorAll('.btn');
let clear=document.querySelector('.btn-clear');
let equal=document.querySelector('.btn-equal');
let back=document.querySelector('.btn-back')
screen.value=null

buttons.forEach(button=>{
    button.addEventListener('click', (e)=>{
        let value=e.target.dataset.num;
        screen.value+=value;
    })
})

equal.addEventListener('click',(e)=>{
    // console.log('equal');
    if(screen.value===""){
        screen.value=""
    }else{
        let answer=eval(screen.value);
        // console.log(answer);
        screen.value=answer
    }
})
clear.addEventListener('click',(e)=>{
    screen.value=''
})

back.addEventListener('click',()=>{
    
})