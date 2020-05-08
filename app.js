let canvas = document.querySelector("canvas");
let color = document.querySelector("li input");
let li = document.querySelector(".action");
let ul = document.querySelector("ul");
let save = document.querySelector(".save");
let quick = document.querySelector(".quick");
let cx = canvas.getContext("2d");
let html = document.querySelector("html");
let pallets = document.querySelectorAll(".color-palate div");
let input = document.querySelector(".int");
let slider = document.querySelectorAll(".slider");
let p = document.querySelector("p");
let getQuick = document.querySelector(".getQuick");
let toggle = false;

let brushState = {
  eraser: true,
  color: "black",
  size: 30,
  lastPos: [],
};

for (let i of pallets) {
  i.style = `background-color:${i.className}`;
  i.addEventListener("click", (e) => {
    brushState.color = i.className;
  });
}

for (let i of slider) {
  i.addEventListener("input", (e) => {
    input.value = i.value;

    brushState.size = i.value;
  });
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  let pos = {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };

  return pos;
}

function getTouchPos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  let pos = {
    x: evt.targetTouches[0].pageX - rect.left,
    y: evt.targetTouches[0].pageY - rect.top,
  };

  console.log(pos);

  return pos;
}

function draw(e) {
  if (e.buttons == 1) {
    let pos = getMousePos(canvas, e);
    brushState.lastPos[0] = pos.x;
    brushState.lastPos[1] = pos.y;
    quick.style.height = 0;
    slider.value = input.value;
    save.innerHTML = "Save";
    toggle = false;
    cx.fillStyle = brushState.color;
    cx.fillRect(pos.x, pos.y, brushState.size / 3, brushState.size / 3);
  }
}

function showQuick(e) {
  if (e.key == "a" && !toggle == true) {
    quick.style.left = brushState.lastPos[0] + 10;
    quick.style.top = brushState.lastPos[1];
    quick.style.height = 0;

    quick.style.height = 250;
    quick.style.display = "block";
    save.innerHTML = "Key : a";
    toggle = true;
  } else {
    toggle = false;
    slider.value = input.value;
    quick.style.height = 0;
    save.innerHTML = "Save";
  }
}

canvas.addEventListener("mousemove", draw);

li.addEventListener("click", (e) => {
  ul.style.transform = "scaleY(0)";
});

color.addEventListener("input", (e) => {
  brushState.color = color.value;
});

html.addEventListener("keypress", showQuick);

input.addEventListener("input", (e) => {
  brushState.size = input.value;
});

getQuick.addEventListener("click", (e) => {
  if (!toggle == true) {
    quick.style.left = 10;
    quick.style.top = 10;
    quick.style.height = 150;
    quick.style.width = 200;
    toggle = true;
    quick.style.display = "block";
  } else {
    toggle = false;
    quick.style.height = 0;
  }
});

function touchDraw(e) {
  let pos = getTouchPos(canvas, e);
  brushState.lastPos[0] = pos.x;
  brushState.lastPos[1] = pos.y;
  quick.style.height = 0;
  slider.value = input.value;
  save.innerHTML = "Save";
  toggle = false;
  cx.fillStyle = brushState.color;
  cx.fillRect(pos.x, pos.y, brushState.size / 3, brushState.size / 3);
}

canvas.addEventListener("touchmove", touchDraw);
