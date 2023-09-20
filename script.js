const canvas = document.querySelector("canvas");

// Context on the canvas
const ctx = canvas.getContext("2d");

// Takes the whole window width and height on the user device instead of the default 300 x 150
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Player functionality
class Player {
  constructor({ position, velocity }) {
    this.position = position; // {x,y}
    this.velocity = velocity;
  }

  draw() {
    // Checks that the player is in the center
    /* ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false);
    ctx.fillStyle = "blue";
    ctx.fill();
    */
    // Rectangle
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.position.x, this.position.y, 50, 50);

    ctx.moveTo(this.position.x + 30, this.position.y);
    ctx.lineTo(this.position.x - 10, this.position.y - 10);
    ctx.lineTo(this.position.x - 10, this.position.y + 10);
    ctx.closePath();

    ctx.strokeStyle = "white";
    ctx.stroke();
  }
}

// Default for the player
const player = new Player({
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  velocity: { x: 0, y: 0 },
});

player.draw();
