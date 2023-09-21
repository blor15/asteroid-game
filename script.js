const canvas = document.querySelector("canvas");

// Context on the canvas
const ctx = canvas.getContext("2d");

// CONSTANT
const SPEED = 3;
const ROTATIONAL_SPEED = 0.05;
const FRICTION = 0.97;
const PROJECTILES_SPEED = 5;

const projectiles = [];

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
    this.rotation = 0;
  }

  draw() {
    ctx.save();

    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);
    ctx.translate(-this.position.x, -this.position.y);

    ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false);
    ctx.fillStyle = "blue";
    ctx.fill();

    // Rectangle
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.position.x, this.position.y, 50, 50);

    ctx.beginPath();
    ctx.moveTo(this.position.x + 30, this.position.y);
    ctx.lineTo(this.position.x - 10, this.position.y - 10);
    ctx.lineTo(this.position.x - 10, this.position.y + 10);
    ctx.closePath();

    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.restore();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

// Default for the player
const player = new Player({
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  velocity: { x: 0, y: 0 },
});

// Projectile functionality
class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 5;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

// Player movement

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW":
      console.log("w was pressed");
      keys.w.pressed = true;
      break;
    case "KeyA":
      console.log("a was pressed");
      keys.a.pressed = true;
      break;
    case "KeyD":
      console.log("d was pressed");
      keys.d.pressed = true;
      break;
    case "Space":
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + Math.cos(player.rotation) * 30,
            y: player.position.y + Math.sin(player.rotation) * 30,
          },
          velocity: {
            x: Math.cos(player.rotation * PROJECTILES_SPEED),
            y: Math.sin(player.rotation * PROJECTILES_SPEED),
          },
        })
      );
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyW":
      console.log("w was pressed");
      keys.w.pressed = false;
      break;
    case "KeyA":
      console.log("a was pressed");
      keys.a.pressed = false;
      break;
    case "KeyD":
      console.log("d was pressed");
      keys.d.pressed = false;
      break;
  }
});

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.update();

  for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile = projectiles[i];
    projectile.update();

    //
    if (
      projectile.position.x + projectile.radius < 0 ||
      projectile.position.x - projectile.radius > canvas.width ||
      projectile.position.y - projectile.radius > canvas.height ||
      projectile.position.y + projectile.radius < 0
    ) {
      projectiles.splice(i, 1);
    }
  }

  if (keys.w.pressed) {
    player.velocity.x = Math.cos(player.rotation) * SPEED;
    player.velocity.y = Math.sin(player.rotation) * SPEED;
  } else if (!keys.w.pressed) {
    player.velocity.x *= FRICTION;
    player.velocity.y *= FRICTION;
  }

  if (keys.d.pressed) player.rotation += ROTATIONAL_SPEED;
  else if (keys.a.pressed) player.rotation -= ROTATIONAL_SPEED;
}

animate();
