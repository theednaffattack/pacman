import { Boundary } from "./boundary";

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
}
