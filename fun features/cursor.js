let body = document.querySelector("body");
let cursor = document.querySelector(".cursor");

body.addEventListener("mousemove", (e) => {
  let pos = getMousePos(canvas, e);
  cursor.style.left = pos.x - 5.5;
  cursor.style.top = pos.y - 6;
});

body.addEventListener("touchmove", (e) => {
  let pos = getTouchPos(canvas, e);
  cursor.style.left = pos.x - 5.5;
  cursor.style.top = pos.y - 6;
});

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

  return pos;
}
