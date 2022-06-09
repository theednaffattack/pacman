import { Boundary } from "./boundary";
import { circleCollidesWithRectangle } from "./circle-collides-with-rectangle";
import { createImage } from "./create-image";
import { handelKeyup } from "./handel-keyup";
import { handleKeydown, keys, lastKey } from "./handle-keydown";
import { Pellet } from "./pellet";
import { Player } from "./player";

export const canvas = document.querySelector<HTMLCanvasElement>("canvas")!;

const context = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

type GameMapEntities = (
  | "-"
  | "|"
  | "."
  | "1"
  | "2"
  | "3"
  | "4"
  | "b"
  | "5"
  | "6"
  | "7"
  | "8"
  | "+"
  | "]"
  | "["
  | "p"
  | "_"
  | "^"
)[];

const gameMap: GameMapEntities[] = [
  ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "+", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", "p", "|"],
  ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
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
      let pellets: Pellet[] = [];

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
                  image: createImage("../images/pipeHorizontal.png"),
                })
              );
              break;
            case "|":
              boundaries.push(
                new Boundary({
                  position: {
                    x: Boundary.width * cellIndex,
                    y: Boundary.height * rowIndex,
                  },
                  image: createImage("../images/pipeVertical.png"),
                })
              );
              break;
            case "1":
              boundaries.push(
                new Boundary({
                  position: {
                    x: Boundary.width * cellIndex,
                    y: Boundary.height * rowIndex,
                  },
                  image: createImage("../images/pipeCorner1.png"),
                })
              );
              break;
            case "2":
              boundaries.push(
                new Boundary({
                  position: {
                    x: Boundary.width * cellIndex,
                    y: Boundary.height * rowIndex,
                  },
                  image: createImage("../images/pipeCorner2.png"),
                })
              );
              break;
            case "3":
              boundaries.push(
                new Boundary({
                  position: {
                    x: Boundary.width * cellIndex,
                    y: Boundary.height * rowIndex,
                  },
                  image: createImage("../images/pipeCorner3.png"),
                })
              );
              break;
            case "4":
              boundaries.push(
                new Boundary({
                  position: {
                    x: Boundary.width * cellIndex,
                    y: Boundary.height * rowIndex,
                  },
                  image: createImage("../images/pipeCorner4.png"),
                })
              );
              break;
            case "b":
              boundaries.push(
                new Boundary({
                  position: {
                    x: Boundary.width * cellIndex,
                    y: Boundary.height * rowIndex,
                  },
                  image: createImage("../images/block.png"),
                })
              );
              break;
            case "[":
              boundaries.push(
                new Boundary({
                  position: {
                    x: cellIndex * Boundary.width,
                    y: rowIndex * Boundary.height,
                  },
                  image: createImage("../images/capLeft.png"),
                })
              );
              break;
            case "]":
              boundaries.push(
                new Boundary({
                  position: {
                    x: cellIndex * Boundary.width,
                    y: rowIndex * Boundary.height,
                  },
                  image: createImage("../images/capRight.png"),
                })
              );
              break;
            case "_":
              boundaries.push(
                new Boundary({
                  position: {
                    x: cellIndex * Boundary.width,
                    y: rowIndex * Boundary.height,
                  },
                  image: createImage("../images/capBottom.png"),
                })
              );
              break;
            case "^":
              boundaries.push(
                new Boundary({
                  position: {
                    x: cellIndex * Boundary.width,
                    y: rowIndex * Boundary.height,
                  },
                  image: createImage("../images/capTop.png"),
                })
              );
              break;
            case "+":
              boundaries.push(
                new Boundary({
                  position: {
                    x: cellIndex * Boundary.width,
                    y: rowIndex * Boundary.height,
                  },
                  image: createImage("../images/pipeCross.png"),
                })
              );
              break;
            case "5":
              boundaries.push(
                new Boundary({
                  position: {
                    x: cellIndex * Boundary.width,
                    y: rowIndex * Boundary.height,
                  },
                  color: "blue",
                  image: createImage("../images/pipeConnectorTop.png"),
                })
              );
              break;
            case "6":
              boundaries.push(
                new Boundary({
                  position: {
                    x: cellIndex * Boundary.width,
                    y: rowIndex * Boundary.height,
                  },
                  color: "blue",
                  image: createImage("../images/pipeConnectorRight.png"),
                })
              );
              break;
            case "7":
              boundaries.push(
                new Boundary({
                  position: {
                    x: cellIndex * Boundary.width,
                    y: rowIndex * Boundary.height,
                  },
                  color: "blue",
                  image: createImage("../images/pipeConnectorBottom.png"),
                })
              );
              break;
            case "8":
              boundaries.push(
                new Boundary({
                  position: {
                    x: cellIndex * Boundary.width,
                    y: rowIndex * Boundary.height,
                  },
                  image: createImage("../images/pipeConnectorLeft.png"),
                })
              );
              break;
            case ".":
              pellets.push(
                new Pellet({
                  position: {
                    x: cellIndex * Boundary.width + Boundary.width / 2,
                    y: rowIndex * Boundary.height + Boundary.height / 2,
                  },
                })
              );
              break;
          }
        });
      });

      // Draw pellets
      pellets.forEach((pellet) => {
        pellet.draw(context);
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
            player.velocity.y = 0;
            break;
          } else {
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
            player.velocity.y = 0;
            break;
          } else {
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
