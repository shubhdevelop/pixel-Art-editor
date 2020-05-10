let canvas = document.querySelector(".work");
let color = document.querySelector("li input");
let li = document.querySelector(".action");
let ul = document.querySelector("ul");
let cx = canvas.getContext("2d");
let input = document.querySelector(".int");
let p = document.querySelector("p");
let getQuick = document.querySelector(".getQuick");
let recentColor = document.querySelectorAll(".recent-color");
let pallets = document.querySelectorAll(".color-palate div");
let slider = document.querySelectorAll(".slider");
let save = document.querySelector(".save");
let quick = document.querySelector(".quick");
let html = document.querySelector("html");
let toggle = false;

let brushState = {
  color: "black",
  size: 19,
  lastPos: [],
  recentcolor: ["white", "white", "white", "white", "white", "white"],
  maxBrushSize: 4,
  undo: [],
  redo: [],
};

let temp = [];

canvas.addEventListener("mouseup", (e) => {
  brushState.undo.push(temp);
  temp = [];
});

canvas.addEventListener("touchup", (e) => {
  brushState.undo.push(temp);
  temp = [];
});
