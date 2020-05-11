import("../app.js");

let preview = document.querySelector(".preview").getContext("2d");

document.body.addEventListener("wheel", showSize);
html.addEventListener("keypress", showQuick);
document.body.addEventListener("keypress", undoFeature);
document.body.addEventListener("keypress", redoFeature);
