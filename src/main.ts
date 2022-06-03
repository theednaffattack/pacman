import { Boundary } from "./boundary";
import { handelKeyup } from "./handel-keyup";
import { handleKeydown, keys, lastKey } from "./handle-keydown";
import { Player } from "./player";

export const canvas = document.querySelector<HTMLCanvasElement>("canvas")!;

const context = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const gameMap = [
  ["-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", " ", "-"],
  ["-", " ", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "", "-", "-", " ", " ", "-"],
  ["-", " ", " ", " ", " ", " ", " ", "-"],
  ["-", " ", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-"],
];
if (context) {
  const player = new Player({
    position: {
      x: Boundary.width + Boundary.width / 2,
      y: Boundary.height + Boundary.height / 2,
    },
    velocity: { x: 0, y: 0 },
  });

  function animate() {
    if (context) {
      requestAnimationFrame(animate);
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Fill the entire canvas with black BEFORE drawing
      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw our game map.
      gameMap.map((row, rowIndex) =>
        row.map((cellSymbol, cellIndex) => {
          let newBoundary;
          if (cellSymbol === "-") {
            newBoundary = new Boundary({
              position: {
                x: Boundary.width * cellIndex,
                y: Boundary.height * rowIndex,
              },
            });
            newBoundary.draw(context);

            if (
              player.position.y - player.radius + player.velocity.y <=
                newBoundary.position.y + newBoundary.height &&
              player.position.x + player.radius + player.velocity.x >=
                newBoundary.position.x &&
              player.position.y + player.radius + player.velocity.y >=
                newBoundary.position.y &&
              player.position.x - player.radius + player.velocity.x <=
                newBoundary.position.x + newBoundary.width
            ) {
              player.velocity.y = 0;
              player.velocity.x = 0;
            }
          }
        })
      );

      // Add our Player
      // player.draw(context);
      player.update(context);

      // prevent player from moving endlessly
      // on the 'y' axis
      player.velocity.y = 0;
      player.velocity.x = 0;

      if (
        (keys.w.pressed && lastKey === "w") ||
        (keys.ArrowUp.pressed && lastKey === "ArrowUp")
      ) {
        player.velocity.y = -5;
      } else if (
        (keys.s.pressed && lastKey === "s") ||
        (keys.ArrowDown.pressed && lastKey === "ArrowDown")
      ) {
        player.velocity.y = 5;
      } else if (
        (keys.a.pressed && lastKey === "a") ||
        (keys.ArrowLeft.pressed && lastKey === "ArrowLeft")
      ) {
        player.velocity.x = -5;
      } else if (
        (keys.d.pressed && lastKey === "d") ||
        (keys.ArrowRight.pressed && lastKey === "ArrowRight")
      ) {
        player.velocity.x = 5;
      }
    }
  }

  animate();

  addEventListener("keydown", (evt) => handleKeydown(evt, player));

  addEventListener("keyup", (evt) => handelKeyup(evt, player));
}
