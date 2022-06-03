import { Boundary } from "./boundary";
import { Player } from "./player";

interface CircleCollidesWithRectangleProps {
  circle: Player;
  rectangle: Boundary;
}

export function circleCollidesWithRectangle({
  circle,
  rectangle,
}: CircleCollidesWithRectangleProps) {
  return (
    circle.position.y - circle.radius + circle.velocity.y <=
      rectangle.position.y + rectangle.height &&
    circle.position.x + circle.radius + circle.velocity.x >=
      rectangle.position.x &&
    circle.position.y + circle.radius + circle.velocity.y >=
      rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x <=
      rectangle.position.x + rectangle.width
  );
}
