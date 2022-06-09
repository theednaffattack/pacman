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

export let lastKey = "";

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
        lastKey = "ArrowUp";
        break;
      case "ArrowDown":
        keys.ArrowDown.pressed = true;
        lastKey = "ArrowDown";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        lastKey = "ArrowLeft";
        break;
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        lastKey = "ArrowRight";
        break;
      case "w":
        keys.w.pressed = true;
        lastKey = "w";
      case "a":
        keys.a.pressed = true;
        lastKey = "a";
        break;
      case "s":
        keys.s.pressed = true;
        lastKey = "s";
        break;
      case "d":
        keys.d.pressed = true;
        lastKey = "d";
        break;
    }
  }
}
