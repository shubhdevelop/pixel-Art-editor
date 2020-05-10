import("../app.js");

let preview = document.querySelector(".preview").getContext("2d");

document.body.addEventListener("wheel", (e) => {
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
        preview.clearRect(
          55,
          45,
          brushState.maxBrushSize * 1.8,
          brushState.maxBrushSize
        );
        brushState.size -= 4;
        preview.fillRect(60, 40, brushState.size * 1.8, brushState.size);
      }
    }
  }
});

html.addEventListener("keypress", showQuick);

document.body.addEventListener("keypress", undoFeature);
