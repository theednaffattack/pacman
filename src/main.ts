import { Boundary } from "./boundary";
import { circleCollidesWithRectangle } from "./circle-collides-with-rectangle";
import { handelKeyup } from "./handel-keyup";
import { handleKeydown, keys, lastKey } from "./handle-keydown";
import { Player } from "./player";

export const canvas = document.querySelector<HTMLCanvasElement>("canvas")!;

const context = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

type GameMapEntities = ("-" | " ")[];

const gameMap: GameMapEntities[] = [
  ["-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", " ", "-"],
  ["-", " ", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", "-", " ", "-", " ", "-"],
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

      let boundaries: Boundary[] = [];

      // Redo creation of game map.
      gameMap.forEach((row, rowIndex) => {
        row.forEach((symbol, cellIndex) => {
          switch (symbol) {
            case "-":
              boundaries.push(
                new Boundary({
                  position: {
                    x: Boundary.width * cellIndex,
                    y: Boundary.height * rowIndex,
                  },
                })
              );
              break;
            // case " ":
            //   boundaries.push(
            //     new Boundary({
            //       position: {
            //         x: Boundary.width * cellIndex,
            //         y: Boundary.height * cellIndex,
            //       },
            //     })
            //   );
            default:
              break;
          }
        });
      });

      // Draw our game map.
      boundaries.forEach((boundary) => {
        boundary.draw(context);

        if (
          circleCollidesWithRectangle({ circle: player, rectangle: boundary })
        ) {
          player.velocity.x = 0;
          player.velocity.y = 0;
        }
      });

      // Add our Player
      // player.draw(context);
      player.update(context);

      // prevent player from moving endlessly
      // on the 'y' axis
      player.velocity.y = 0;
      player.velocity.x = 0;

      // Handle moving player here rather than
      // our key handler to prevent jankiness
      if (
        (keys.w.pressed && lastKey === "w") ||
        (keys.ArrowUp.pressed && lastKey === "ArrowUp")
      ) {
        // Predict whether the player will collide
        // before the player actually does
        for (let index = 0; index < boundaries.length; index++) {
          const boundary = boundaries[index];
          // do stuff
          // boundaries.forEach((boundary) => {
          if (
            circleCollidesWithRectangle({
              circle: {
                ...player,
                draw: player.draw,
                update: player.update,
                velocity: {
                  x: 0,
                  y: -5,
                },
              },
              rectangle: boundary,
            })
          ) {
            console.log("STOPPING UP", boundary);
            player.velocity.y = 0;
            break;
          } else {
            console.log("HEADING UP");
            player.velocity.y = -5;
          }
          // });
        }
      } else if (
        (keys.s.pressed && lastKey === "s") ||
        (keys.ArrowDown.pressed && lastKey === "ArrowDown")
      ) {
        for (let index = 0; index < boundaries.length; index++) {
          const boundary = boundaries[index];
          // do stuff
          // boundaries.forEach((boundary) => {
          if (
            circleCollidesWithRectangle({
              circle: {
                ...player,
                draw: player.draw,
                update: player.update,
                velocity: {
                  x: 0,
                  y: 5,
                },
              },
              rectangle: boundary,
            })
          ) {
            console.log("STOPPING UP", boundary);
            player.velocity.y = 0;
            break;
          } else {
            console.log("HEADING UP");
            player.velocity.y = 5;
          }
          // });
        }
      } else if (
        (keys.a.pressed && lastKey === "a") ||
        (keys.ArrowLeft.pressed && lastKey === "ArrowLeft")
      ) {
        for (let index = 0; index < boundaries.length; index++) {
          const boundary = boundaries[index];
          // do stuff
          // boundaries.forEach((boundary) => {
          if (
            circleCollidesWithRectangle({
              circle: {
                ...player,
                draw: player.draw,
                update: player.update,
                velocity: {
                  x: -5,
                  y: 0,
                },
              },
              rectangle: boundary,
            })
          ) {
            player.velocity.x = 0;
            break;
          } else {
            player.velocity.x = -5;
          }
          // });
        }
      } else if (
        (keys.d.pressed && lastKey === "d") ||
        (keys.ArrowRight.pressed && lastKey === "ArrowRight")
      ) {
        for (let index = 0; index < boundaries.length; index++) {
          const boundary = boundaries[index];
          // do stuff
          // boundaries.forEach((boundary) => {
          if (
            circleCollidesWithRectangle({
              circle: {
                ...player,
                draw: player.draw,
                update: player.update,
                velocity: {
                  x: 5,
                  y: 0,
                },
              },
              rectangle: boundary,
            })
          ) {
            player.velocity.x = 0;
            break;
          } else {
            player.velocity.x = 5;
          }
          // });
        }
      }
    }
  }

  animate();

  addEventListener("keydown", (evt) => handleKeydown(evt, player));

  addEventListener("keyup", (evt) => handelKeyup(evt, player));
}
