import { Player } from "./player";

export const keys = {
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

export function handleKeydown({ key }: KeyboardEvent, player: Player) {
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
        keys.ArrowUp.pressed = true;
        break;
      case "ArrowDown":
        keys.ArrowDown.pressed = true;
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        break;
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        break;
      case "w":
        keys.w.pressed = true;
      case "a":
        keys.a.pressed = true;
        break;
      case "s":
        keys.s.pressed = true;
        break;
      case "d":
        keys.d.pressed = true;
        break;

      default:
        break;
    }
  }
}
