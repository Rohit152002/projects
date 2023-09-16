import { getInputDirection } from "./input.js";

export const SNAKE_SPEED=5;
export const snakeBody=[
    {x:11,y:11}
]
let newSegments=0;
export function update(){
    addSegments()
    const inputDirection=getInputDirection()
    for(let i=snakeBody.length-2;i>=0;i--){
        snakeBody[i+1]={...snakeBody[i]}
        // console.log({...snakeBody[0]});
    }
    snakeBody[0].x+=inputDirection.x;
    snakeBody[0].y+=inputDirection.y;

}
export function draw(gameboard){
    snakeBody.forEach(segment=>{
        const snakeElement=document.createElement('div');
        snakeElement.classList.add('snake');
        snakeElement.style.gridRowStart=segment.y;
        snakeElement.style.gridColumnStart=segment.x;
        gameboard.appendChild(snakeElement)
    })

}

export function expandSnake(amount){
    newSegments+=amount
}

export function onSnake(position,{ignoreHead=false}={}){

    return snakeBody.some((segment,index)=>{
        if(ignoreHead && index===0) return false;
        return equalposition(position,segment)
    })
}
function equalposition(pos1,pos2){
    return (pos1.x===pos2.x && pos1.y===pos2.y);
}

function addSegments(){
    for(let i=0;i<newSegments;i++){
        snakeBody.push({...snakeBody[snakeBody.length-1]})
    }
    newSegments=0
}