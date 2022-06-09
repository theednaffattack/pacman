import { PositionProps } from "./boundary";

interface PelletProps {
  position: PositionProps;
}

export class Pellet {
  position: PositionProps;
  radius: number;
  constructor({ position }: PelletProps) {
    this.position = position;
    this.radius = 3;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "white";
    context.fill();
    context.closePath();
  }
}
