import { keys } from "./handle-keydown";
import { Player } from "./player";

export function handelKeyup({ key }: KeyboardEvent, player: Player) {
  const watchedKeys = [
    "w",
    "a",
    "s",
    "d",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
  ];
  if (watchedKeys.includes(key)) {
    switch (key) {
      case "ArrowUp":
        keys.ArrowUp.pressed = false;
        break;
      case "ArrowDown":
        keys.ArrowDown.pressed = false;
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        break;
      case "ArrowRight":
        keys.ArrowRight.pressed = false;
        break;
      case "w":
        keys.w.pressed = false;
      case "a":
        keys.a.pressed = false;
        break;
      case "s":
        keys.s.pressed = false;
        break;
      case "d":
        keys.d.pressed = false;
        break;
    }
  }
}
