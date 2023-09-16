let food=getRandomFoodPosition()

import {expandSnake, onSnake } from "./snake.js";
const EXPANSION_RATE=2;

export function update(){

    if(onSnake(food)){
        console.log('eaten');
        expandSnake(EXPANSION_RATE)
        food=getRandomFoodPosition()
    }

}
export function draw(gameboard){
        const foodElement=document.createElement('div');
        foodElement.classList.add('food');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        gameboard.appendChild(foodElement)
}

function getRandomFoodPosition(){
    let newFoodPosition;
    while(newFoodPosition==null || onSnake(newFoodPosition)){
        newFoodPosition=randomGridPosition()
    }
    return newFoodPosition
}

function randomGridPosition(){
return{
    x:Math.floor(Math.random()*21),
    y:Math.floor(Math.random()*21)
}
}