const time = document.querySelector('.time');
const quote=document.querySelector('.quote')
const start=document.querySelector('button')

const text=quote.innerText;
console.log(text);
const textArray=text.split('');
console.log(textArray);
quote.innerHTML=null;
textArray.forEach(text=>{
    const spanElement=document.createElement('span');
    spanElement.innerText=text;
    quote.append(spanElement);
})
const textArea=document.querySelector('textarea');
textArea.addEventListener('input',()=>{
const arrayQuote=document.querySelectorAll('span');
const arrayValue=textArea.value.split('')
    arrayQuote.forEach((characterSpan,index)=>{
        const character=arrayValue[index];
        if(character==null){
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect')
        }
        else if(character===characterSpan.innerText){
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect')
        }else{
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            
        }
    })

})
 start.addEventListener('click',()=>{
    startTimer();
 })
// startTime()
let startTime;
function startTimer(){
    time.innerText=0;
    startTime=new Date();
    setInterval(()=>{
       time.innerText=Math.floor((new Date()- startTime)/1000)
    },1000)
}