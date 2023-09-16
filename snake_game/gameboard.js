let lastRendertime = 0;
import {draw as drawSnake,update as updateSnake,SNAKE_SPEED, snakeBody, onSnake} from './snake.js';

import{update as updateFood, draw as drawFood} from './food.js'
let gameover=false
const gameboard = document.getElementById("game-board");
function main(currentTime) {

  if(gameover){
    return alert("Restart the game ");
  }
  window.requestAnimationFrame(main);
  const secondSinceLastRender = (currentTime - lastRendertime) / 1000;
  if (secondSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRendertime = currentTime;
  // console.log('render');  
  update()
  draw()
}

function update(){
  updateSnake()
  updateFood()
  checkDeath()
}
function draw() {
  gameboard.innerHTML=''
  drawSnake(gameboard);
  drawFood(gameboard)
}

window.requestAnimationFrame(main);

// window.addEventListener("keydown", (e) => {

//       console.log(e);
//   }
// );

function checkDeath(){
  gameover=outsideGrid(getSnakeHead()|| snakeIntersection())
}

function getSnakeHead(){
  return snakeBody[0];
}
function outsideGrid(snakeHead){
  if(snakeHead.x>21 || snakeHead.y>21 || snakeHead.x<1 || snakeHead.y<1){
    return true
  }
}
function snakeIntersection(){
  return onSnake(snakeBody[0],{ignoreHead:true})
}