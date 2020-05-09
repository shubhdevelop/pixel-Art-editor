let canvas = document.querySelector(".work");
let preview = document.querySelector(".preview").getContext("2d");

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
let recentColor = document.querySelectorAll(".recent-color");

let toggle = false;

let brushState = {
  eraser: true,
  color: "black",
  size: 30,
  lastPos: [],
  recentcolor: ["white", "white", "white", "white", "white", "white"],
  maxBrushSize: 4,
};

for (let i of pallets) {
  i.style = `background-color:${i.className}`;
  i.addEventListener("click", (e) => {
    brushState.color = i.className;
    pushRecentColor(i.className);
  });
}

for (let i of slider) {
  i.addEventListener("input", (e) => {
    input.value = i.value;
    brushState.size = i.value;
  });
}

updateRecentColor();

function updateRecentColor() {
  console.log(brushState.recentcolor[brushState.recentcolor.length - 1]);

  console.log(brushState.recentcolor);
  for (i = 5; i >= 0; i--) {
    recentColor[i].style.background =
      brushState.recentcolor[brushState.recentcolor.length - 1 - i];
  }

  brushState.recentcolor.slice;
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
  pushRecentColor(color.value);
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

  console.log(pos, "touch");

  quick.style.height = 0;
  slider.value = input.value;
  save.innerHTML = "Save";
  toggle = false;
  cx.fillStyle = brushState.color;
  cx.fillRect(pos.x, pos.y, brushState.size / 3, brushState.size / 3);
}

canvas.addEventListener("touchmove", touchDraw);
document.body.addEventListener("touchmove", noScroll, false);
document.body.addEventListener("touchstart", noScroll, false);
document.body.addEventListener("touchend", noScroll, false);

function noScroll(e) {
  if (e.target.nodeName == "CANVAS") {
    e.preventDefault();
  }
}

function pushRecentColor(value) {
  console.log("triggered", "with value", value);
  console.log(brushState.recentcolor.length);
  brushState.recentcolor.push(value);

  updateRecentColor();
}

document.body.addEventListener("wheel", (e) => {
  console.log(e);
  preview.fillStyle = brushState.color;
  if (e.altKey == true) {
    if (e.deltaY == -100) {
      if (brushState.size <= 96) {
        brushState.size += 4;
      }

      if (
        brushState.size > brushState.maxBrushSize &&
        brushState.maxBrushSize < 100
      ) {
        brushState.maxBrushSize = brushState.size;
      }
      preview.fillRect(60, 40, brushState.size * 1.8, brushState.size);
    } else {
      if (brushState.size > 0) {
        console.log(brushState.maxBrushSize);

        preview.clearRect(
          60,
          40,
          brushState.maxBrushSize * 1.8,
          brushState.maxBrushSize
        );
        brushState.size -= 4;
        preview.fillRect(60, 40, brushState.size * 1.8, brushState.size);
      }
    }
  }
});
