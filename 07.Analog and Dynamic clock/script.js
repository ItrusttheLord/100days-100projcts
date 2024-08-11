"use strict";

const handHr = document.querySelector(".hour");
const handMin = document.querySelector(".minute");
const handSec = document.querySelector(".second");
const hrsEl = document.getElementById("hrs");
const minEl = document.getElementById("min");
const secEl = document.getElementById("sec");
const monthEl = document.querySelector(".month");
const dayEl = document.querySelector(".day");
const yearEl = document.querySelector(".year");
const weekDay = document.getElementById("week-day");
const modeIcon = document.getElementById("icon");
const body = document.querySelector("body");

const dayOfWeek = [
  "Sunday",
  "Mondayu",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getTime = function () {
  setInterval(() => {
    let date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    // define how fast the hands will rotate
    let hr_rotation = 30 * hr + min / 2;
    let min_rotation = 6 * min;
    let sec_rotation = 6 * sec;
    // add rotation to the hands
    handHr.style.transform = `rotate(${hr_rotation}deg)`;
    handMin.style.transform = `rotate(${min_rotation}deg)`;
    handSec.style.transform = `rotate(${sec_rotation}deg)`;
    // display the time on the dynamic clock
    hrsEl.textContent = hr < 10 ? "0" + hr : hr;
    minEl.textContent = min < 10 ? "0" + min : min;
    secEl.textContent = sec < 10 ? "0" + sec : sec;
    // display the date
    weekDay.textContent = dayOfWeek[date.getDay()] + ",";
    monthEl.textContent = toISOString(date.getMonth());
    dayEl.textContent =
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    yearEl.textContent =
      date.getFullYear() < 10 ? "0" + date.getFullYear() : date.getFullYear();
  }, 1000);
};
getTime();
// change theme
const changeTheme = function () {
  // toggle class 'dark' to body
  body.classList.toggle("dark");
  // if body contins dark we change the icon
  if (body.classList.contains("dark")) {
    modeIcon.src = "images/sun.png";
    // save theme
    localStorage.setItem("theme", "dark");
  } else {
    modeIcon.src = "images/moon.png";
    localStorage.setItem("theme", "light");
  }
};
// add event to the btn and also call changeTheme();
document.querySelector(".mode-switch").addEventListener("click", changeTheme);
// get the theme from localStarage
const currTheme = localStorage.getItem("theme");
// display the theme based on the conditions
const displayTheme = function () {
  if (currTheme === "dark") {
    body.classList.add("dark");
    modeIcon.src = "images/sun.png";
  } else {
    body.classList.remove("dark");
    modeIcon.src = "images/moon.png";
  }
};
displayTheme();
