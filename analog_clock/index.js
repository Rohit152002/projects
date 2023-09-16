setInterval(setClock, 1000);
setInterval(opacity, 500);
// setClock()
const secondHand = document.querySelector("[data-second-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const hourHand = document.querySelector("[data-hour-hand]");



const digitalSecond = document.querySelector(".digitalSecond");
const digitalHour = document.querySelector(".digitalHour");
const digitMinute = document.querySelector(".digitalMinute");

const dot = document.querySelectorAll(".dot");
// console.log(dot);
let i = 1;
function opacity() {
  if (i == 1) {
    dot.forEach((element) => {
      element.style.color = "rgba(0, 0, 0, 1)";
    });
    i = 0;
  } else {
    dot.forEach((element) => {
      element.style.color = "rgba(0, 0, 0, 0)";
    });
    i = 1;
  }
  // console.log(i);
}
function setClock() {
  const currentTime = new Date();
  const secondHandValue = currentTime.getSeconds() / 60;
  const minuteHandValue = (secondHandValue + currentTime.getMinutes()) / 60;
  const hourHandValue = (minuteHandValue + currentTime.getHours()) / 12;
  setRotation(secondHand, secondHandValue);
  setRotation(minuteHand, minuteHandValue);
  setRotation(hourHand, hourHandValue);


  setTime(digitalSecond, currentTime.getSeconds());
  setTime(digitMinute, currentTime.getMinutes());
  setTime(digitalHour, currentTime.getHours());
}

function setRotation(elements, rotation) {
  elements.style.setProperty("--rotation", `${rotation * 360}deg`);
}

function setTime(elements, value) {
  if (value / 10 < 1) {
    elements.innerText = "0" + value;
  } else {
    elements.innerText = value;
  }
}

setClock();

//30sec=180deg
//1sec=180/30;
