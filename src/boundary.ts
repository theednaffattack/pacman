export interface PositionProps {
  x: number;
  y: number;
}
export interface BoundaryProps {
  position: PositionProps;
  image: CanvasImageSource;
}

export class Boundary {
  static width = 40;
  static height = 40;

  height: number;
  position: PositionProps;
  width: number;
  image: CanvasImageSource;

  constructor({ position, image }: BoundaryProps) {
    this.position = position;
    this.width = Boundary.width;
    this.height = Boundary.height;
    this.image = image;
  }

  draw(context: CanvasRenderingContext2D) {
    // context.fillStyle = "blue";
    // context.fillRect(this.position.x, this.position.y, this.width, this.height);
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}
