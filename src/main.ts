import { Boundary } from "./boundary";
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
  // Fill the entire canvas with black BEFORE drawing
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw our game map.
  gameMap.map((row, rowIndex) =>
    row.map((cellSymbol, cellIndex) =>
      cellSymbol === "-"
        ? new Boundary({
            position: {
              x: Boundary.width * cellIndex,
              y: Boundary.height * rowIndex,
            },
          }).draw(context)
        : undefined
    )
  );

  const pacman = new Player({
    position: {
      x: Boundary.width + Boundary.width / 2,
      y: Boundary.height + Boundary.height / 2,
    },
    velocity: { x: 0, y: 0 },
  });

  // Add our Player
  pacman.draw(context);
}
