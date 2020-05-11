import("../app.js");
import("../function/functions.js");
import("../shortcut/shortcut.js");

updateRecentColor();
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", touchDraw, false);
document.body.addEventListener("touchmove", noScroll, false);
document.body.addEventListener("touchstart", noScroll, false);
document.body.addEventListener("touchend", noScroll, false);

for (let i of pallets) {
  i.style = `background-color:${i.className}`;
  i.addEventListener("click", (e) => {
    brushState.color = i.className;
    pushRecentColor(i.className);
  });
}
/*
 *
 *
 *
 *
 *
 *
 */

for (let i of slider) {
  i.addEventListener("input", (e) => {
    input.value = i.value;
    brushState.size = i.value;
  });
}
/**
 *
 *
 *
 *
 *
 */
for (let i of recentColor) {
  i.addEventListener("click", (e) => {
    color = i.classList;
    brushState.color = color[1];
  });
}
/*
 *
 *
 *
 *
 *
 *
 */
getQuick.addEventListener(
  "click",

  (e) => {
    if (!toggle == true) {
      quick.style.left = 10;
      quick.style.top = 10;
      quick.style.height = 250;
      quick.style.width = 200;
      toggle = true;
      quick.style.display = "block";
    } else {
      toggle = false;
      quick.style.height = 0;
    }
  }
);
/*
 *
 *
 *
 *
 *
 *
 */

li.addEventListener("click", transformLi);
/*
 *
 *
 *
 *
 *
 *
 */

color.addEventListener("input", (e) => {
  changeCurrentColor(e, color);
});

quickColor.addEventListener("input", (e) => {
  changeCurrentColor(e, quickColor);
});
/*
 *
 *
 *
 *
 *
 *
 */
input.addEventListener("input", changeCurrentSize);
/*
 *
 *
 *
 *
 *
 *
 */
undo.addEventListener("click", doUndo);
/**
 *
 *
 *
 *
 */

redo.addEventListener("click", doRedo);
