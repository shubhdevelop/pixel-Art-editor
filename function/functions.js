import("../app.js");

function updateRecentColor() {
  for (i = 5; i >= 0; i--) {
    recentColor[i].style.background =
      brushState.recentcolor[brushState.recentcolor.length - 1 - i];
  }
}

/*
  
  
  
  
  
  
  
  
  
*/

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  let pos = {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };

  return pos;
}

/*
  
  
  
  
  
  
  
  
  
*/

function getTouchPos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  let pos = {
    x: evt.targetTouches[0].pageX - rect.left,
    y: evt.targetTouches[0].pageY - rect.top,
  };

  return pos;
}

/*
  
  
  
  
  
  
  
  
  
*/
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
    if (brushState.size % 2 != 0) {
      brushState.size--;
    }
    cx.fillRect(pos.x, pos.y, brushState.size / 2, brushState.size / 2);

    //state management

    temp.push([cx.fillStyle, brushState.size, pos.x, pos.y]);
  }
}

/*
  
  
  
  
  
  
  
  
  
*/

function touchDraw(e) {
  let pos = getTouchPos(canvas, e);
  brushState.lastPos[0] = pos.x;
  brushState.lastPos[1] = pos.y;
  quick.style.height = 0;
  slider.value = input.value;
  save.innerHTML = "Save";
  toggle = false;
  cx.fillStyle = brushState.color;
  cx.fillRect(pos.x, pos.y, brushState.size / 2, brushState.size / 2);

  temp.push([cx.fillStyle, brushState.size, pos.x, pos.y]);
}

/*
  
  
  
  
  
  
  
  
  
*/

function noScroll(e) {
  if (e.target.nodeName == "CANVAS") {
    e.preventDefault();
  }
}

/*
  
  
  
  
  
  
  
  
  
*/

function pushRecentColor(value) {
  brushState.recentcolor.push(value);

  updateRecentColor();
}
/*
 *
 *
 *
 *
 *
 *
 *
 *
 */

function showQuick(e) {
  if (e.key == "a" && !toggle == true) {
    quick.style.left = brushState.lastPos[0] + 10;
    quick.style.top = brushState.lastPos[1];

    quick.style.height = 250;
    quick.style.display = "block";
    save.innerHTML = "Key : a";
    toggle = true;
  } else {
    toggle = false;
    slider.value = input.value;
    quick.style.height = 0;
    save.innerHTML = "Undo";
  }
}

/*
 *
 *

 *
 *
 */

function transformLi(e) {
  ul.style.transform = "scaleY(0)";
}
/*
 *

 *
 *
 */
function changeCurrentColor(e) {
  brushState.color = color.value;
  pushRecentColor(color.value);
}
/*
 *
 *

 *
 */
function changeCurrentSize(e) {
  brushState.size = input.value;
}

/*
 *
 *

 *
 */

function undoFeature(e) {
  if (e.code == "KeyZ") {
    if (e.ctrlKey == true) {
      let toUndo = brushState.undo.pop();
      brushState.redo.push(toUndo);

      for (let [color, size, x, y] of toUndo) {
        cx.fillStyle = "white";
        cx.fillRect(x - 2, y - 2, size / 2 + 3, size / 2 + 3);
      }
      for (let [color, size, x, y] of brushState.undo[
        brushState.undo.length - 1
      ]) {
        cx.fillStyle = color;
        cx.fillRect(x, y, size / 2, size / 2);
      }
    }
  }
}
