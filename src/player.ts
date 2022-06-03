import { PositionProps } from "./boundary";

export interface PlayerProps {
  position: PositionProps;
  velocity: PositionProps;
}
export class Player {
  position: PositionProps;
  height: number;
  radius: number;
  width: number;
  velocity: PositionProps;

  constructor({ position, velocity }: PlayerProps) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.velocity = velocity;
    this.radius = 10;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "yellow";
    context.fill();
    context.closePath();
  }
}
