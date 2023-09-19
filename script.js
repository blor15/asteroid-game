const canvas = document.querySelector("canvas");

// Context on the canvas
const ctx = canvas.getContext("2d");

// Takes the whole window width and height on the user device instead of the default 300 x 150
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
