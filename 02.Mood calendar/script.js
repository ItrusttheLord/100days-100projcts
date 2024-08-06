"use strict";
// Paul-DS/bootstrap-year-calendar
const cal = new Calendar(document.querySelector(".calendar"));
const days = document.querySelectorAll(".day .day-content");
const listMoods = document.querySelectorAll(".mood");
const clearBtn = document.querySelector(".clear");
const randomBtn = document.querySelector(".random");

// create array of the color will we use this to create a random function
const colors = ["orange", "green", "red", "blue", "purple"];
// set the default color to white
const defaultColor = "#fff";
let activeColor = "";
// for each mood click event
listMoods.forEach((mood) => {
  mood.addEventListener("click", () => {
    // check if it contains the class
    if (mood.classList.contains("selected")) {
      // remove the class and set active class to white
      mood.classList.remove("selected");
      activeColor = defaultColor;
    } else {
      //remove the selected class from each one
      listMoods.forEach((mood) => {
        mood.classList.remove("selected");
      });
      // add the selected class and also activate the color
      mood.classList.add("selected");
      activeColor = getComputedStyle(mood).getPropertyValue("color");
    }
  });
});
// add click to each day and also add activeColor to it when clicked
days.forEach((day) => {
  day.addEventListener("click", () => {
    day.style.backgroundColor = activeColor;
  });
});
// create random colors when its clicked
randomBtn.addEventListener("click", () => {
  days.forEach((day) => {
    day.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
  });
});
// clear everything when click
clearBtn.addEventListener("click", () => {
  days.forEach((day) => {
    day.style.backgroundColor = defaultColor;
  });
});
