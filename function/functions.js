import("../app.js");

function updateRecentColor() {
  for (i = 5; i >= 0; i--) {
    recentColor[i].setAttribute(
      "class",
      `recent-color ${
        brushState.recentcolor[brushState.recentcolor.length - 1 - i]
      }`
    );
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
    undo.innerHTML = "Undo";
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
  undo.innerHTML = "undo";
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
    undo.innerHTML = "Key : a";
    toggle = true;
  } else {
    toggle = false;
    slider.value = input.value;
    quick.style.height = 0;
    undo.innerHTML = "Undo";
  }
}

/*
 *
 *

 *
 *
 */

function transformLi(e) {
  if (!isHidden) {
    for (let i of listItems) {
      i.style.display = "none";
    }
    isHidden = true;
    li.innerText = "+";
    li.style.top;
  } else {
    for (let i of listItems) {
      i.style.display = "block";
      i.style.innerText = "X";
    }
    isHidden = false;
  }
}
/*
 *

 *
 *
 */
function changeCurrentColor(e, element) {
  brushState.color = element.value;
  pushRecentColor(element.value);
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
      doUndo();
    }
  }
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

function doUndo(e) {
  let toUndo = brushState.undo.pop();
  brushState.redo.push(toUndo);

  for (let [color, size, x, y] of toUndo) {
    cx.fillStyle = "white";
    cx.fillRect(x - 2, y - 2, size / 2 + 3, size / 2 + 3);
  }
  for (let [color, size, x, y] of brushState.undo[brushState.undo.length - 1]) {
    cx.fillStyle = color;
    cx.fillRect(x, y, size / 2, size / 2);
  }
}
/**
 *
 *
 *
 *
 *
 *
 *
 *
 */

function showSize(e) {
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
      preview.fillRect(60, 40, brushState.size * 2, brushState.size);
    } else {
      if (brushState.size > 0) {
        preview.clearRect(
          60,
          40,
          brushState.maxBrushSize * 2,
          brushState.maxBrushSize
        );
        brushState.size -= 4;
        preview.fillRect(60, 40, brushState.size * 2, brushState.size);
      }
    }
  }
}
/**
 *
 *
 *
 *
 *
 *
 */
function redoFeature(e) {
  if (e.code == "KeyY") {
    if (e.ctrlKey == true) {
      doRedo();
    }
  }
}
/**
 *
 *
 *
 *
 *
 *
 */

function doRedo(e) {
  let toRedo = brushState.redo.pop();
  brushState.undo.push(toRedo);

  for (let [color, size, x, y] of toRedo) {
    cx.fillStyle = color;
    cx.fillRect(x, y, size / 2, size / 2);
  }
}
